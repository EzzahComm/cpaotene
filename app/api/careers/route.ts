import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const cvFile = formData.get("cv") as File | null;

    if (!firstName || !lastName || !email || !phone || !position) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const supabase = await createServiceClient();
    let cvUrl: string | null = null;

    // Upload CV to Supabase Storage
    if (cvFile && cvFile.size > 0) {
      const fileExt = cvFile.name.split(".").pop();
      const fileName = `${Date.now()}-${firstName.toLowerCase()}-${lastName.toLowerCase()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("career-applications")
        .upload(fileName, cvFile, {
          contentType: cvFile.type,
          upsert: false,
        });

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from("career-applications")
          .getPublicUrl(fileName);
        cvUrl = urlData.publicUrl;
      }
    }

    // Insert application
    const { error: dbError } = await supabase.from("applications").insert({
      position_title: position,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      cover_letter: coverLetter || null,
      cv_url: cvUrl,
    });

    if (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }

    // Confirmation email to applicant
    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: `Application Received: ${position} — CPA Otene and Associates LLP`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0B1F3A, #123D6B); padding: 40px 32px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Application Received</h1>
          </div>
          <div style="padding: 40px 32px;">
            <p>Dear ${firstName},</p>
            <p>Thank you for applying to join <strong>CPA Otene and Associates LLP</strong> for the position of <strong>${position}</strong>.</p>
            <p>Our HR team will review your application and get back to you within <strong>5 business days</strong>.</p>
            <p>If your application progresses, we will contact you at this email address to discuss next steps.</p>
            <p>We wish you the best in your application.</p>
          </div>
          <div style="background: #0B1F3A; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} CPA Otene and Associates LLP. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    // HR notification
    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.HR_NOTIFICATION_EMAIL!,
      subject: `New Application: ${position} — ${firstName} ${lastName}`,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${cvUrl ? `<p><strong>CV:</strong> <a href="${cvUrl}">Download CV</a></p>` : ""}
        ${coverLetter ? `<p><strong>Cover Letter:</strong></p><p>${coverLetter}</p>` : ""}
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications">View in Dashboard</a></p>
      `,
    });

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Careers API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
