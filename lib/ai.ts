import { z } from "zod";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const CLAUDE_URL = "https://api.anthropic.com/v1/messages";

const POLYCAP_SYSTEM_PROMPT = `You are Polycap. A. W., the virtual receptionist and onboarding assistant for CPA Otene & Associates LLP in Kenya. You help clients with audit, tax, governance, risk, internal audit, and management consultancy. You qualify leads, recommend the best service, and respond politely with professional, East Africa–friendly language.

When a lead is submitted, analyze their business and recommend whether they should be qualified, followed up with, or passed to a client advisor. Give concise recommendations and preserve confidentiality.`;

const ASSESSMENT_PROMPT = `You are an AI lead qualifier for CPA Otene & Associates LLP. Given a client intake record, return a JSON object with the following fields:
- leadScore: integer from 1 to 10
- priority: one of "high", "medium", "low"
- qualification: one of "qualified", "needs_follow_up", "not_qualified"
- recommendedServices: array of service names
- summary: a short summary of the lead
- followUpMessage: a short sales-ready follow-up note for the CPA team

Return only valid JSON.`;

const AssessmentOutputSchema = z.object({
  leadScore: z.number().int().min(1).max(10),
  priority: z.enum(["high", "medium", "low"]),
  qualification: z.enum(["qualified", "needs_follow_up", "not_qualified"]),
  recommendedServices: z.array(z.string()),
  summary: z.string(),
  followUpMessage: z.string(),
});

export type AssessmentResult = z.infer<typeof AssessmentOutputSchema>;

function extractJson(text: string) {
  const jsonMatch = text.match(/```json([\s\S]*?)```/i);
  const candidate = jsonMatch ? jsonMatch[1] : text;
  try {
    return JSON.parse(candidate.trim());
  } catch {
    const firstBrace = candidate.indexOf("{");
    const lastBrace = candidate.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      return JSON.parse(candidate.slice(firstBrace, lastBrace + 1));
    }
  }
  return null;
}

function getAiProvider() {
  if (process.env.OPENAI_API_KEY) {
    return "openai";
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return "anthropic";
  }
  throw new Error("No AI API key configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY.");
}

async function fetchOpenAIResponse(messages: ChatMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY!;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 900,
      n: 1,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI error: ${response.status} ${body}`);
  }

  const payload = await response.json();
  return payload.choices?.[0]?.message?.content || "";
}

async function fetchClaudeResponse(messages: ChatMessage[]) {
  const apiKey = process.env.ANTHROPIC_API_KEY!;
  // Default: claude-haiku-4-5 (fast + affordable). Override with ANTHROPIC_MODEL env var.
  const model = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

  // Separate system prompt from conversation messages (Messages API requirement)
  const systemMessage = messages.find((m) => m.role === "system");
  const conversationMessages = messages.filter((m) => m.role !== "system");

  const response = await fetch(CLAUDE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      temperature: 0.2,
      ...(systemMessage && { system: systemMessage.content }),
      messages: conversationMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Claude error: ${response.status} ${body}`);
  }

  const payload = await response.json();
  return payload?.content?.[0]?.text || "";
}

export async function queryAgent(messages: ChatMessage[]) {
  const provider = getAiProvider();
  if (provider === "openai") {
    return await fetchOpenAIResponse(messages);
  }
  return await fetchClaudeResponse(messages);
}

export async function classifyOnboardingRequest(formData: Record<string, unknown>): Promise<AssessmentResult & { raw: string }> {
  const snippets = Object.entries(formData)
    .map(([key, value]) => `- ${key}: ${typeof value === "string" ? value : JSON.stringify(value)}`)
    .join("\n");

  const messages: ChatMessage[] = [
    { role: "system", content: POLYCAP_SYSTEM_PROMPT },
    { role: "user", content: `${ASSESSMENT_PROMPT}\n\nClient intake data:\n${snippets}` },
  ];

  const answer = await queryAgent(messages);
  const parsed = extractJson(answer);

  if (!parsed) {
    return {
      raw: answer,
      leadScore: null,
      priority: "medium",
      qualification: "needs_follow_up",
      recommendedServices: [],
      summary: "AI response could not be parsed.",
      followUpMessage: "Please review this lead manually.",
    };
  }

  const result = AssessmentOutputSchema.safeParse(parsed);
  if (!result.success) {
    return {
      raw: answer,
      leadScore: null,
      priority: "medium",
      qualification: "needs_follow_up",
      recommendedServices: Array.isArray(parsed?.recommendedServices) ? parsed.recommendedServices : [],
      summary: parsed?.summary || "AI response returned invalid assessment.",
      followUpMessage: parsed?.followUpMessage || "Please review this lead manually.",
    };
  }

  return {
    raw: answer,
    ...result.data,
  };
}
