import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.cpaotene.co.ke"),
  title: {
    default: "CPA Otene & Associates LLP | Audit, Governance & Advisory Kenya",
    template: "%s | CPA Otene & Associates LLP",
  },
  description:
    "CPA Otene and Associates LLP — Kenya's trusted audit, governance, tax, risk, and advisory firm. Serving enterprises, NGOs, public institutions, and growth-focused businesses across East Africa.",
  keywords: [
    "audit firms Kenya",
    "best audit firms Nairobi",
    "governance advisory Kenya",
    "tax consultants Kenya",
    "ESG consultants East Africa",
    "IFRS advisory Kenya",
    "internal audit services Kenya",
    "risk advisory Kenya",
    "CPA firms Kenya",
    "professional accounting firms Kenya",
    "CPA Otene",
  ],
  authors: [{ name: "CPA Otene and Associates LLP" }],
  creator: "CPA Otene and Associates LLP",
  publisher: "CPA Otene and Associates LLP",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.cpaotene.co.ke",
    siteName: "CPA Otene and Associates LLP",
    title: "CPA Otene & Associates LLP | Audit, Governance & Advisory Kenya",
    description:
      "Kenya's premier audit, governance, tax, risk and advisory firm — building trust beyond numbers across East Africa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CPA Otene and Associates LLP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CPA Otene & Associates LLP | Audit, Governance & Advisory Kenya",
    description:
      "Kenya's premier audit, governance, tax, risk and advisory firm.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
