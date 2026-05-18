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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.cpaotene.com"),
  title: {
    default: "CPA OTENE & ASSOCIATES LLP | Audit, Tax & Risk Advisory Services Kenya",
    template: "%s | CPA OTENE & ASSOCIATES LLP",
  },
  description:
    "CPA OTENE & ASSOCIATES LLP is a professional accounting, audit, tax, risk advisory, and management consultancy firm based in Nairobi, Kenya. Serving enterprises, NGOs, public institutions, and growth-focused businesses across East Africa.",
  keywords: [
    "audit services Kenya",
    "tax advisory Kenya",
    "accounting firm Nairobi",
    "forensic audit Kenya",
    "risk advisory services",
    "management consultancy Kenya",
    "CPA firm Nairobi",
    "governance advisory Kenya",
    "IFRS advisory Kenya",
    "internal audit services Kenya",
    "bookkeeping templates Kenya",
    "accounting resources Kenya",
    "ESG consultants East Africa",
    "CPA OTENE",
    "professional accounting firms Kenya",
  ],
  authors: [{ name: "CPA OTENE & ASSOCIATES LLP" }],
  creator: "CPA OTENE & ASSOCIATES LLP",
  publisher: "CPA OTENE & ASSOCIATES LLP",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.cpaotene.com",
    siteName: "CPA OTENE & ASSOCIATES LLP",
    title: "CPA OTENE & ASSOCIATES LLP | Audit, Tax & Risk Advisory Services Kenya",
    description:
      "Kenya's premier audit, tax, risk advisory, and management consultancy firm — building confidence beyond compliance across East Africa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CPA OTENE & ASSOCIATES LLP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CPAOTENE_LLP",
    title: "CPA OTENE & ASSOCIATES LLP | Audit, Tax & Risk Advisory Kenya",
    description:
      "Kenya's premier audit, governance, tax, risk advisory, and management consultancy firm.",
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
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
