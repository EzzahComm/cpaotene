import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Deployment Configuration ───────────────────────────────────────────────
  // output: "standalone" for cPanel/Passenger (comment out for Vercel)
  // Vercel uses default output for serverless functions
  // For cPanel: uncomment the line below
  output: "standalone",

  // ─── Images ─────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Use a custom loader on shared hosting where sharp may not compile
    // Switch to "squoosh" if sharp fails during build
    // loader: "default",
    // Vercel-optimized image settings
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
  },

  // ─── Performance ────────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
    ],
    // Faster builds with parallel route compilation
    parallelServerBuildTraces: true,
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Compress responses
  compress: true,

  // ─── Build Optimization ─────────────────────────────────────────────────────
  productionBrowserSourceMaps: false,

  // ─── Headers & Security ─────────────────────────────────────────────────────
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
      ],
    },
    {
      source: "/static/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
