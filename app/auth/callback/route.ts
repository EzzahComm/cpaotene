import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { clientOnboardingWorkflow } from "@/workflows/client-onboarding";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const user = data.user;

      // Detect brand-new signups (created within the last 30 seconds)
      const isNewUser =
        !!user.created_at &&
        Date.now() - new Date(user.created_at).getTime() < 30_000;

      if (isNewUser) {
        // Fire-and-forget: trigger onboarding workflow without blocking the redirect
        try {
          const adminClient = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          );
          const { data: clientData } = await adminClient
            .from("clients")
            .select("first_name, organization_name")
            .eq("user_id", user.id)
            .single();

          // Intentionally not awaited at top level — workflow is durable
          clientOnboardingWorkflow({
            userId: user.id,
            email: user.email!,
            firstName: clientData?.first_name ?? user.email!.split("@")[0],
            organizationName: clientData?.organization_name ?? "your organisation",
          }).catch((err) =>
            console.error("[Onboarding Workflow] Failed to start:", err)
          );
        } catch (err) {
          console.error("[Onboarding Workflow] Setup error:", err);
        }
      }

      // Honour the ?next= param set by middleware (preserves intended destination)
      const next = searchParams.get("next") ?? "/client-portal";
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Return to login page with error
  return NextResponse.redirect(new URL("/auth/login?error=invalid_code", request.url));
}
