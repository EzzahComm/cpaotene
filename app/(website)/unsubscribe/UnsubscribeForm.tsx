"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  email: string;
};

type State = "confirm" | "loading" | "done" | "error";

export default function UnsubscribeForm({ email }: Props) {
  const [state, setState] = useState<State>("confirm");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleUnsubscribe() {
    setState("loading");
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("done");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  // ── Confirmed / done ────────────────────────────────────────────────────────
  if (state === "done") {
    return (
      <div className="text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(200,162,77,0.12)" }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#C8A24D" fillOpacity="0.15" />
            <path
              d="M10 16.5l4.5 4.5 8-8"
              stroke="#C8A24D"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          className="mb-3 text-2xl font-bold"
          style={{ color: "#0B1F3A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          You've been unsubscribed
        </h2>
        <p className="mb-2 text-gray-500 text-sm">
          <span className="font-medium text-gray-700">{email}</span> has been removed
          from our mailing list.
        </p>
        <p className="mb-8 text-gray-400 text-sm">
          You won't receive any further newsletters from CPA Otene and Associates LLP.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/insights"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "#0B1F3A" }}
          >
            Browse Our Insights
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────────
  if (state === "error") {
    return (
      <div className="text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: "rgba(239,68,68,0.1)" }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 9v6M14 18.5v.5"
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="14" cy="14" r="12" stroke="#ef4444" strokeWidth="2" />
          </svg>
        </div>
        <h2
          className="mb-3 text-2xl font-bold"
          style={{ color: "#0B1F3A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Something went wrong
        </h2>
        <p className="mb-8 text-gray-500 text-sm">{errorMsg}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => setState("confirm")}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "#0B1F3A" }}
          >
            Try Again
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  // ── Confirm state (default) ─────────────────────────────────────────────────
  return (
    <div className="text-center">
      {/* Mail icon */}
      <div
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "rgba(11,31,58,0.06)" }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <rect x="3" y="7" width="24" height="17" rx="3" stroke="#0B1F3A" strokeWidth="2" />
          <path
            d="M3 10l12 8 12-8"
            stroke="#0B1F3A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2
        className="mb-3 text-2xl font-bold"
        style={{ color: "#0B1F3A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Unsubscribe from our newsletter?
      </h2>
      <p className="mb-2 text-gray-500 text-sm">
        You're about to unsubscribe{" "}
        <span className="font-semibold text-gray-700 break-all">{email}</span>{" "}
        from CPA Otene Insights.
      </p>
      <p className="mb-8 text-gray-400 text-sm">
        You'll stop receiving expert commentary on tax, governance, audit, ESG, and risk.
        You can re-subscribe at any time from our website.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleUnsubscribe}
          disabled={state === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          style={{ background: "#0B1F3A" }}
        >
          {state === "loading" ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Processing…
            </>
          ) : (
            "Yes, unsubscribe me"
          )}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Keep me subscribed
        </Link>
      </div>
    </div>
  );
}
