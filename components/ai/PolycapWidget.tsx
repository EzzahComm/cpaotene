"use client";

import { useMemo, useState } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm Polycap. A. W. — your CPA Otene assistant. Ask me about our services, onboarding, or how we can support your organisation.",
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
                "You are Polycap. A. W., the friendly CPA receptionist and onboarding assistant for CPA Otene & Associates LLP — a leading Kenyan professional services firm offering audit, tax, governance, risk, and advisory services. Answer in professional, clear, and Kenya-focused language. Help visitors understand our services and guide them toward booking a consultation.",
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
        <div className="w-[340px] max-w-full rounded-2xl border border-gray-200 bg-white shadow-enterprise-xl ring-1 ring-navy-900/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-navy-900 to-royal-600 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold-400/20 border border-gold-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={15} className="text-gold-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white font-heading">Polycap. A. W.</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <p className="text-xs text-white/60">CPA Otene AI Assistant</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
              aria-label="Close chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-[340px] space-y-3 overflow-y-auto px-4 py-4 bg-gray-50/50">
            {visibleMessages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-white border border-gray-100 text-charcoal-800 shadow-enterprise"
                      : "bg-navy-900 text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-enterprise">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-navy-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 px-4 py-3 bg-white">
            {error ? (
              <p className="mb-2 text-xs text-red-600">{error}</p>
            ) : null}
            <div className="flex items-center gap-2">
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Ask Polycap..."
                className="min-h-[40px] flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !value.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-50 flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-white shadow-enterprise-xl transition hover:bg-navy-800 hover:scale-105 border border-navy-700"
          aria-label="Open Polycap chat"
        >
          <MessageSquare size={22} />
        </button>
      )}
    </div>
  );
}
