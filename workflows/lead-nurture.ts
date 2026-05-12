/**
 * LEAD NURTURE WORKFLOW
 * ─────────────────────────────────────────────────────────────────────────────
 * Triggered when a service intake form is submitted.
 *
 * Sequence:
 *   T+0        → Confirm AI assessment was saved (step, already done in route)
 *   T+24 hours → Check if the lead has been contacted in Supabase
 *   T+24 hours → If no response recorded: escalate to senior advisor
 *   T+72 hours → Final check — if still untouched, flag as at-risk
 *
 * This ensures no lead goes cold due to a team member missing the initial
 * notification email.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { sleep } from "workflow";
import { Resend } from "resend";

// ── Types ────────────────────────────────────────────────────────────────────

export interface LeadNurturePayload {
  requestId: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  serviceType: string;
  /** AI lead score (1–10), set after intake classification */
  leadScore?: number | null;
  priority?: "high" | "medium" | "low" | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function getLeadStatus(requestId: string): Promise<{
  status: string;
  contacted_at: string | null;
  ai_assessment: Record<string, unknown> | null;
}> {
  "use step";
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data } = await supabase
    .from("onboarding_requests")
    .select("status, contacted_at, ai_assessment")
    .eq("id", requestId)
    .single();

  return {
    status: data?.status ?? "pending",
    contacted_at: data?.contacted_at ?? null,
    ai_assessment: data?.ai_assessment ?? null,
  };
}

async function markLeadEscalated(requestId: string): Promise<void> {
  "use step";
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase
    .from("onboarding_requests")
    .update({ status: "escalated", escalated_at: new Date().toISOString() })
    .eq("id", requestId);
}

async function markLeadAtRisk(requestId: string): Promise<void> {
  "use step";
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase
    .from("onboarding_requests")
    .update({ status: "at_risk", at_risk_flagged_at: new Date().toISOString() })
    .eq("id", requestId);
}

async function sendEscalationAlert(payload: LeadNurturePayload): Promise<void> {
  "use step";
  const resend = new Resend(process.env.RESEND_API_KEY);

  const priorityLabel = payload.priority
    ? payload.priority.toUpperCase()
    : "UNSCORED";

  const scoreLabel = payload.leadScore != null
    ? `${payload.leadScore}/10`
    : "N/A";

  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL!,
    subject: `⚠️ [ESCALATION] Uncontacted lead 24h: ${payload.organizationName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#b91c1c;padding:20px 32px;">
          <h2 style="color:#ffffff;margin:0;font-size:18px;">
            ⚠️ Lead Escalation — 24 Hours No Contact
          </h2>
        </div>
        <div style="padding:32px;background:#fff;">
          <p>This lead submitted a service intake form <strong>24 hours ago</strong> and has not yet been contacted. Please follow up immediately.</p>

          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr style="background:#F5F7FA;">
              <td style="padding:10px;font-weight:bold;width:40%;">Organisation</td>
              <td style="padding:10px;">${payload.organizationName}</td>
            </tr>
            <tr>
              <td style="padding:10px;font-weight:bold;">Contact</td>
              <td style="padding:10px;">${payload.firstName} ${payload.lastName}</td>
            </tr>
            <tr style="background:#F5F7FA;">
              <td style="padding:10px;font-weight:bold;">Email</td>
              <td style="padding:10px;"><a href="mailto:${payload.email}">${payload.email}</a></td>
            </tr>
            <tr>
              <td style="padding:10px;font-weight:bold;">Service Requested</td>
              <td style="padding:10px;">${payload.serviceType}</td>
            </tr>
            <tr style="background:#F5F7FA;">
              <td style="padding:10px;font-weight:bold;">AI Lead Score</td>
              <td style="padding:10px;"><strong>${scoreLabel}</strong> — ${priorityLabel} priority</td>
            </tr>
          </table>

          <div style="text-align:center;margin:24px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads/${payload.requestId}"
               style="background:#0B1F3A;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;">
              View Lead in Dashboard
            </a>
          </div>
          <p style="color:#6B7280;font-size:13px;">
            This lead has been automatically marked as <strong>Escalated</strong>.
            Update its status once contact has been made.
          </p>
        </div>
      </div>
    `,
  });
}

async function sendAtRiskAlert(payload: LeadNurturePayload): Promise<void> {
  "use step";
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
    to: process.env.ADMIN_NOTIFICATION_EMAIL!,
    subject: `🚨 [AT-RISK] Lead untouched 72h: ${payload.organizationName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#7c3aed;padding:20px 32px;">
          <h2 style="color:#ffffff;margin:0;font-size:18px;">
            🚨 At-Risk Lead — 72 Hours No Contact
          </h2>
        </div>
        <div style="padding:32px;background:#fff;">
          <p>
            <strong>${payload.organizationName}</strong> (${payload.firstName} ${payload.lastName})
            submitted a service intake <strong>72 hours ago</strong> and still has no
            recorded contact. This lead is now marked <strong>At-Risk</strong> and may disengage.
          </p>
          <p>
            Email: <a href="mailto:${payload.email}">${payload.email}</a><br/>
            Service: ${payload.serviceType}<br/>
            Lead ID: <code>${payload.requestId}</code>
          </p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/leads/${payload.requestId}"
               style="background:#7c3aed;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block;">
              View Lead
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

// ── Workflow ──────────────────────────────────────────────────────────────────

export async function leadNurtureWorkflow(payload: LeadNurturePayload) {
  "use workflow";

  // T+24 hours — first follow-up check
  await sleep("24 hours");

  const status24h = await getLeadStatus(payload.requestId);

  // Only escalate if the team hasn't already contacted the lead
  if (!status24h.contacted_at && status24h.status === "pending") {
    await markLeadEscalated(payload.requestId);
    await sendEscalationAlert({
      ...payload,
      leadScore: (status24h.ai_assessment as any)?.leadScore ?? payload.leadScore,
      priority: (status24h.ai_assessment as any)?.priority ?? payload.priority,
    });
  }

  // T+72 hours — final at-risk check (48h after the escalation)
  await sleep("48 hours");

  const status72h = await getLeadStatus(payload.requestId);

  if (!status72h.contacted_at && ["pending", "escalated"].includes(status72h.status)) {
    await markLeadAtRisk(payload.requestId);
    await sendAtRiskAlert(payload);
  }

  // Workflow ends — lead was either contacted (success) or flagged for manual review
}
