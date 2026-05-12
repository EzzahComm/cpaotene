import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { z } from "zod";
import { withRateLimit, RATE_LIMITS } from "@/lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
  firstName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  // Rate limit: 3 subscriptions per hour per IP
  const limited = await withRateLimit(request, RATE_LIMITS.newsletter);
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const { email, firstName } = parsed.data;

    const supabase = await createServiceClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
      }
      // Reactivate
      await supabase
        .from("newsletter_subscribers")
        .update({ status: "active" })
        .eq("id", existing.id);
    } else {
      await supabase.from("newsletter_subscribers").insert({ email, first_name: firstName });
    }

    // Send welcome email
    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: "Welcome to CPA Otene Insights",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0B1F3A, #123D6B); padding: 40px 32px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0;">Welcome to Our Insights</h1>
          </div>
          <div style="padding: 40px 32px;">
            <p>Dear ${firstName || "Subscriber"},</p>
            <p>Thank you for subscribing to insights from <strong>CPA Otene and Associates LLP</strong>.</p>
            <p>You'll receive expert commentary on:</p>
            <ul>
              <li>Governance & Board Advisory</li>
              <li>Tax & IFRS Updates</li>
              <li>ESG & Sustainability</li>
              <li>Risk & Regulatory Developments</li>
              <li>Audit & Internal Controls</li>
            </ul>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/insights" style="background: #C8A24D; color: #0B1F3A; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700;">Explore Our Insights</a></p>
          </div>
          <div style="background: #0B1F3A; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: rgba(255,255,255,0.4);">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
