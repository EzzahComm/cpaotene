import { Metadata } from "next";
import Link from "next/link";
import UnsubscribeForm from "./UnsubscribeForm";

export const metadata: Metadata = {
  title: "Unsubscribe — CPA Otene and Associates LLP",
  description: "Unsubscribe from the CPA Otene newsletter.",
  robots: { index: false, follow: false }, // no reason to index this page
};

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function UnsubscribePage({ searchParams }: Props) {
  const { email } = await searchParams;

  // ── Invalid / missing email ──────────────────────────────────────────────
  if (!email || !email.includes("@")) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5F7FA] px-4 py-20">
        <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm text-center">
          {/* Warning icon */}
          <div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(245,158,11,0.1)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 3L27 25H1L14 3z"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M14 11v6M14 20.5v.5"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1
            className="mb-3 text-2xl font-bold"
            style={{ color: "#0B1F3A", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Invalid unsubscribe link
          </h1>
          <p className="mb-8 text-gray-500 text-sm leading-relaxed">
            This unsubscribe link is missing or malformed. Please use the unsubscribe
            link directly from the email you received.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ background: "#0B1F3A" }}
          >
            Contact support
          </Link>
        </div>
      </main>
    );
  }

  // ── Valid email — render confirmation form ───────────────────────────────
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FA] px-4 py-20">

      {/* Brand bar */}
      <Link href="/" className="mb-10 flex items-center gap-2 group">
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2 transition group-hover:opacity-80"
          style={{ background: "#0B1F3A" }}
        >
          <span
            className="text-sm font-bold tracking-widest"
            style={{ color: "#C8A24D", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            CPA OTENE
          </span>
          <span className="h-4 w-px bg-white/20" />
          <span
            className="text-xs font-medium tracking-wide"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            AND ASSOCIATES LLP
          </span>
        </div>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-sm">
        <UnsubscribeForm email={decodeURIComponent(email)} />
      </div>

      {/* Footer note */}
      <p className="mt-8 text-center text-xs text-gray-400 max-w-sm">
        CPA Otene and Associates LLP · Upper Hill, Nairobi, Kenya
        <br />
        <Link href="/insights" className="underline hover:text-gray-600 transition">
          Browse our free insights
        </Link>{" "}
        before you go.
      </p>
    </main>
  );
}
