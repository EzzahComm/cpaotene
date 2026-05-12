/**
 * CLIENT ONBOARDING WORKFLOW
 * ─────────────────────────────────────────────────────────────────────────────
 * Triggered when a new user registers for the CPA Otene client portal.
 *
 * Sequence:
 *   T+0        → Welcome email (immediate)
 *   T+1 day    → Getting started tips email
 *   T+5 days   → Personal check-in email
 *   T+5 days   → Flag client for advisor follow-up in Supabase
 *
 * Uses Vercel Workflow SDK for durable, serverless-safe execution.
 * Each step is atomic and automatically retried on failure.
 * sleep() suspends without consuming compute resources.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { sleep } from "workflow";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Types ────────────────────────────────────────────────────────────────────

export interface OnboardingPayload {
  userId: string;
  email: string;
  firstName: string;
  organizationName: string;
}

// ── Steps ────────────────────────────────────────────────────────────────────

async function sendWelcomeEmail(payload: OnboardingPayload): Promise<void> {
  "use step";
  const { email, firstName, organizationName } = payload;

  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    subject: `Welcome to Your CPA Otene Client Portal, ${firstName}`,
    html: `
      <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#0B1F3A,#123D6B);padding:48px 40px;text-align:center;">
          <div style="display:inline-block;background:rgba(200,162,77,0.15);border-radius:10px;padding:10px 20px;margin-bottom:24px;">
            <span style="color:#C8A24D;font-weight:700;font-size:13px;letter-spacing:2px;">CPA OTENE AND ASSOCIATES LLP</span>
          </div>
          <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0;line-height:1.3;">
            Welcome to Your Client Portal
          </h1>
        </div>

        <div style="padding:40px;">
          <p style="color:#1B1F24;font-size:16px;margin-bottom:16px;">Dear ${firstName},</p>
          <p style="color:#4A5568;font-size:15px;line-height:1.7;margin-bottom:20px;">
            Your client portal for <strong>${organizationName}</strong> is now active.
            This is your secure workspace for managing documents, invoices, and staying
            connected with your advisory team.
          </p>

          <div style="background:#F5F7FA;border-radius:14px;padding:28px;margin:28px 0;">
            <p style="color:#0B1F3A;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin:0 0 16px;">
              What you can do in the portal
            </p>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;">
                  <span style="color:#C8A24D;font-size:16px;">📁</span>
                </td>
                <td style="padding:8px 0;color:#4A5568;font-size:14px;line-height:1.5;">
                  <strong style="color:#1B1F24;">Upload documents</strong> — securely share financial records, contracts, and reports
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;">
                  <span style="color:#C8A24D;font-size:16px;">🧾</span>
                </td>
                <td style="padding:8px 0;color:#4A5568;font-size:14px;line-height:1.5;">
                  <strong style="color:#1B1F24;">Track invoices</strong> — view outstanding and settled invoices at a glance
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;width:28px;">
                  <span style="color:#C8A24D;font-size:16px;">✅</span>
                </td>
                <td style="padding:8px 0;color:#4A5568;font-size:14px;line-height:1.5;">
                  <strong style="color:#1B1F24;">Manage tasks</strong> — stay aligned with your advisory team on deliverables
                </td>
              </tr>
            </table>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/client-portal"
               style="background:#0B1F3A;color:#ffffff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">
              Open Your Portal →
            </a>
          </div>

          <p style="color:#9CA3AF;font-size:13px;line-height:1.6;">
            If you have any questions, reply to this email or contact us at
            <a href="mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}" style="color:#0B1F3A;">
              ${process.env.NEXT_PUBLIC_COMPANY_EMAIL}
            </a>.
          </p>
        </div>

        <div style="background:#0B1F3A;padding:24px 40px;text-align:center;">
          <p style="color:rgba(255,255,255,0.45);font-size:12px;margin:0;">
            © ${new Date().getFullYear()} CPA Otene and Associates LLP · Upper Hill, Nairobi, Kenya
          </p>
        </div>
      </div>
    `,
  });
}

async function sendGettingStartedEmail(payload: OnboardingPayload): Promise<void> {
  "use step";
  const { email, firstName } = payload;

  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    subject: `Getting the most from your CPA Otene portal — quick tips`,
    html: `
      <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#0B1F3A,#123D6B);padding:40px;text-align:center;">
          <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">
            Getting Started — Quick Tips
          </h1>
        </div>

        <div style="padding:40px;">
          <p style="color:#1B1F24;font-size:16px;margin-bottom:20px;">Hi ${firstName},</p>
          <p style="color:#4A5568;font-size:15px;line-height:1.7;margin-bottom:28px;">
            You've had a day to explore your portal. Here are a few things our most
            organised clients do first:
          </p>

          <div style="border-left:3px solid #C8A24D;padding-left:20px;margin-bottom:20px;">
            <p style="color:#0B1F3A;font-weight:700;margin:0 0 4px;">1. Upload your latest financial documents</p>
            <p style="color:#6B7280;font-size:14px;margin:0;">
              Keeping records current means your advisor can act faster on your behalf.
            </p>
          </div>
          <div style="border-left:3px solid #C8A24D;padding-left:20px;margin-bottom:20px;">
            <p style="color:#0B1F3A;font-weight:700;margin:0 0 4px;">2. Review your open invoices</p>
            <p style="color:#6B7280;font-size:14px;margin:0;">
              The Invoices section gives you a real-time view of amounts due and settled.
            </p>
          </div>
          <div style="border-left:3px solid #C8A24D;padding-left:20px;margin-bottom:28px;">
            <p style="color:#0B1F3A;font-weight:700;margin:0 0 4px;">3. Create your first task</p>
            <p style="color:#6B7280;font-size:14px;margin:0;">
              Use Tasks to flag anything you need from your advisory team — we'll prioritise and respond.
            </p>
          </div>

          <div style="text-align:center;margin:32px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/client-portal"
               style="background:#0B1F3A;color:#ffffff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">
              Go to Portal
            </a>
          </div>
        </div>

        <div style="background:#0B1F3A;padding:24px 40px;text-align:center;">
          <p style="color:rgba(255,255,255,0.45);font-size:12px;margin:0;">
            © ${new Date().getFullYear()} CPA Otene and Associates LLP · Upper Hill, Nairobi, Kenya
          </p>
        </div>
      </div>
    `,
  });
}

async function sendCheckInEmail(payload: OnboardingPayload): Promise<void> {
  "use step";
  const { email, firstName, organizationName } = payload;

  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to: email,
    subject: `Checking in — how's everything going, ${firstName}?`,
    html: `
      <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#0B1F3A,#123D6B);padding:40px;text-align:center;">
          <h1 style="color:#ffffff;font-size:22px;font-weight:700;margin:0;">A Quick Check-In</h1>
        </div>

        <div style="padding:40px;">
          <p style="color:#1B1F24;font-size:16px;margin-bottom:20px;">Hi ${firstName},</p>
          <p style="color:#4A5568;font-size:15px;line-height:1.7;margin-bottom:20px;">
            It's been a few days since ${organizationName} joined the CPA Otene client
            portal. We want to make sure you're settling in well and getting the value
            you need from our advisory relationship.
          </p>
          <p style="color:#4A5568;font-size:15px;line-height:1.7;margin-bottom:28px;">
            If there's anything you'd like to discuss — a tax question, a governance
            concern, or simply how best to use the portal — your advisor is ready.
          </p>

          <div style="background:#F5F7FA;border-radius:14px;padding:24px;margin-bottom:28px;text-align:center;">
            <p style="color:#0B1F3A;font-weight:700;font-size:15px;margin:0 0 16px;">
              Schedule a call with your advisor
            </p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/contact"
               style="background:#C8A24D;color:#0B1F3A;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;">
              Book a Call
            </a>
          </div>

          <p style="color:#9CA3AF;font-size:13px;line-height:1.6;">
            Or simply reply to this email — we read every response.
          </p>
        </div>

        <div style="background:#0B1F3A;padding:24px 40px;text-align:center;">
          <p style="color:rgba(255,255,255,0.45);font-size:12px;margin:0;">
            © ${new Date().getFullYear()} CPA Otene and Associates LLP · Upper Hill, Nairobi, Kenya
            &nbsp;·&nbsp;
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}"
               style="color:rgba(255,255,255,0.35);text-decoration:underline;">Unsubscribe</a>
          </p>
        </div>
      </div>
    `,
  });
}

async function flagForAdvisorFollowUp(payload: OnboardingPayload): Promise<void> {
  "use step";
  // Dynamically import Supabase to keep the step self-contained
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from("clients").update({
    advisor_followup_flagged: true,
    advisor_followup_flagged_at: new Date().toISOString(),
  }).eq("user_id", payload.userId);

  // Notify the advisory team
  const resendClient = new Resend(process.env.RESEND_API_KEY);
  await resendClient.emails.send({
    from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL!,
    subject: `[Portal] Follow-up flagged: ${payload.organizationName}`,
    html: `
      <h2 style="font-family:Arial,sans-serif;">Client Follow-Up Reminder</h2>
      <p style="font-family:Arial,sans-serif;">
        <strong>${payload.firstName}</strong> (${payload.organizationName}) joined the client portal
        5 days ago and may benefit from a personal advisor check-in.
      </p>
      <table style="font-family:Arial,sans-serif;border-collapse:collapse;width:100%;">
        <tr><td style="padding:6px;font-weight:bold;">Email:</td><td style="padding:6px;">${payload.email}</td></tr>
        <tr><td style="padding:6px;font-weight:bold;">Organisation:</td><td style="padding:6px;">${payload.organizationName}</td></tr>
        <tr><td style="padding:6px;font-weight:bold;">User ID:</td><td style="padding:6px;">${payload.userId}</td></tr>
      </table>
      <p style="font-family:Arial,sans-serif;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/clients">View in Admin Dashboard</a>
      </p>
    `,
  });
}

// ── Workflow ──────────────────────────────────────────────────────────────────

export async function clientOnboardingWorkflow(payload: OnboardingPayload) {
  "use workflow";

  // T+0 — welcome immediately
  await sendWelcomeEmail(payload);

  // T+1 day — getting started tips
  await sleep("1 day");
  await sendGettingStartedEmail(payload);

  // T+5 days — personal check-in + advisor flag
  await sleep("4 days");
  await sendCheckInEmail(payload);
  await flagForAdvisorFollowUp(payload);
}
