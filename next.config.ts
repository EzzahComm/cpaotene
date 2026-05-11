import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Deployment Configuration ───────────────────────────────────────────────
  // output: "standalone" for cPanel/Passenger (comment out for Vercel)
  // Vercel uses default output for serverless functions
  // For cPanel: uncomment the line below
  // output: "standalone",

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
  },

  // ─── Performance ────────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Compress responses
  compress: true,
};

export default nextConfig;
