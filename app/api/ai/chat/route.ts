import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { queryAgent } from "@/lib/ai";
import { withRateLimit, RATE_LIMITS } from "@/lib/ratelimit";

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string().min(1).max(4000),
    })
  ).min(1).max(20), // cap message history to prevent abuse
});

export async function POST(request: NextRequest) {
  // Rate limit: 30 messages per minute per IP
  const limited = await withRateLimit(request, RATE_LIMITS.aiChat);
  if (limited) return limited;

  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const responseText = await queryAgent(parsed.data.messages);
    return NextResponse.json({ message: responseText });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Unable to process the request right now." },
      { status: 500 }
    );
  }
}
