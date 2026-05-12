import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { z } from "zod";
import { withRateLimit, RATE_LIMITS } from "@/lib/ratelimit";

const schema = z.object({
  email: z.string().email("Valid email required"),
});

export async function POST(request: NextRequest) {
  // Reuse the newsletter rate limit policy — same risk profile
  const limited = await withRateLimit(request, RATE_LIMITS.newsletter);
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { email } = parsed.data;
    const supabase = await createServiceClient();

    // Check the subscriber exists
    const { data: subscriber } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (!subscriber) {
      // Don't reveal whether the email was ever subscribed — return success anyway
      return NextResponse.json({ success: true });
    }

    if (subscriber.status === "inactive") {
      // Already unsubscribed — idempotent
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "inactive",
        unsubscribed_at: new Date().toISOString(),
      })
      .eq("id", subscriber.id);

    if (error) {
      console.error("[Unsubscribe] DB error:", error);
      return NextResponse.json(
        { error: "Could not process your request. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Unsubscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
