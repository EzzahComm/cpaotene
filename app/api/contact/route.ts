import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  organisation: z.string().min(1, "Organisation required"),
  service: z.string().min(1, "Service selection required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Store in Supabase
    const supabase = await createServiceClient();
    const { error: dbError } = await supabase.from("inquiries").insert({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      organisation: data.organisation,
      service: data.service,
      message: data.message,
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    });

    if (dbError) {
      console.error("DB Error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: data.email,
      subject: "Thank you for contacting CPA Otene and Associates LLP",
      html: `
        <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0B1F3A, #123D6B); padding: 40px 32px; text-align: center;">
            <div style="display: inline-block; background: rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 20px; margin-bottom: 20px;">
              <span style="color: #C8A24D; font-weight: 700; font-size: 14px; letter-spacing: 1px;">CPA OTENE</span>
            </div>
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; line-height: 1.3;">
              Thank You for Reaching Out
            </h1>
          </div>

          <div style="padding: 40px 32px;">
            <p style="color: #1B1F24; font-size: 16px; margin-bottom: 16px;">
              Dear ${data.firstName},
            </p>
            <p style="color: #4A5568; font-size: 15px; line-height: 1.7; margin-bottom: 16px;">
              Thank you for contacting <strong>CPA Otene and Associates LLP</strong>. We have received your inquiry regarding <strong>${data.service}</strong> and a member of our advisory team will be in touch with you within <strong>24 hours</strong>.
            </p>

            <div style="background: #F5F7FA; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <h3 style="color: #0B1F3A; font-size: 14px; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Your Inquiry Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px;">Organisation:</td><td style="padding: 6px 0; color: #1B1F24; font-size: 13px; font-weight: 600;">${data.organisation}</td></tr>
                <tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px;">Service:</td><td style="padding: 6px 0; color: #1B1F24; font-size: 13px; font-weight: 600;">${data.service}</td></tr>
                <tr><td style="padding: 6px 0; color: #6B7280; font-size: 13px;">Email:</td><td style="padding: 6px 0; color: #1B1F24; font-size: 13px; font-weight: 600;">${data.email}</td></tr>
              </table>
            </div>

            <p style="color: #4A5568; font-size: 14px; line-height: 1.7;">
              If you have any urgent queries, please call us directly at <strong>+254 700 000 000</strong> or email <strong>info@cpaotene.co.ke</strong>.
            </p>
          </div>

          <div style="background: #0B1F3A; padding: 24px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} CPA Otene and Associates LLP. All rights reserved.<br />
              Upper Hill, Nairobi, Kenya | info@cpaotene.co.ke
            </p>
          </div>
        </div>
      `,
    });

    // Send internal notification
    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL!,
      subject: `New Inquiry: ${data.service} — ${data.organisation}`,
      html: `
        <h2>New Website Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone || "Not provided"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Organisation:</td><td style="padding: 8px;">${data.organisation}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${data.service}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${data.message}</td></tr>
        </table>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/inquiries">View in Dashboard</a></p>
      `,
    });

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
