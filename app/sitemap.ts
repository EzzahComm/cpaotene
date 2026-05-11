import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cpaotene.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/industries", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/insights", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/careers", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  const servicePages = [
    "audit-assurance", "tax-advisory", "governance-advisory", "risk-compliance",
    "internal-audit", "ifrs-advisory", "esg-sustainability", "cybersecurity-advisory",
    "public-sector-advisory", "financial-advisory", "sme-advisory", "bookkeeping",
  ].map((slug) => ({
    url: `/services/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  }));

  const industryPages = [
    "banking", "insurance", "public-sector", "ngo-not-for-profit", "healthcare",
    "real-estate", "energy", "technology", "private-equity", "retail", "saccos", "manufacturing",
  ].map((slug) => ({
    url: `/industries/${slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  const allPages = [...staticPages, ...servicePages, ...industryPages];

  return allPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
