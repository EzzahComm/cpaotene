import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.cpaotene.co.ke"}/sitemap.xml`,
  };
}
