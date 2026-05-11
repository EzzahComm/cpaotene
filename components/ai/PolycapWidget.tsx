"use client";

import { useMemo, useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm Polycap. A. W. — your CPA Otene assistant. Ask me about onboarding, services, or filing documents, and I can help qualify the best next step.",
  },
];

export function PolycapWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const visibleMessages = useMemo(
    () => messages.slice(-10),
    [messages]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim()) return;

    setError(null);
    const userMessage: ChatMessage = { role: "user", content: value.trim() };
    setMessages((current) => [...current, userMessage]);
    setValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are Polycap. A. W., the friendly CPA receptionist and onboarding assistant for CPA Otene & Associates LLP. Answer in professional, clear, and Kenya-focused language.",
            },
            ...messages.map((message) => ({ role: message.role, content: message.content })),
            userMessage,
          ],
        }),
      });

      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || "Failed to contact the AI service");
      }

      setMessages((current) => [...current, { role: "assistant", content: body.message }]);
    } catch (err) {
      console.error(err);
      setError(typeof err === "string" ? err : err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-[340px] max-w-full rounded-3xl border border-slate-200 bg-white shadow-2xl ring-1 ring-slate-900/5">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Polycap. A. W.</p>
              <p className="text-xs text-slate-500">AI assistant for onboarding and services</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto px-4 py-3">
            {visibleMessages.map((message, index) => (
              <div
                key={index}
                className={`rounded-2xl p-3 ${
                  message.role === "assistant"
                    ? "bg-slate-100 text-slate-900"
                    : "bg-blue-600 text-white self-end"
                }`}
              >
                <p className="text-sm leading-6 whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 px-4 py-3">
            {error ? (
              <p className="mb-2 text-xs text-red-600">{error}</p>
            ) : null}
            <div className="flex items-center gap-2">
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Ask Polycap..."
                className="min-h-[44px] flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Thinking..." : <Send size={16} />}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:bg-blue-700"
          aria-label="Open Polycap chat"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
