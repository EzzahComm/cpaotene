import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── cPanel / Passenger deployment ──────────────────────────────────────────
  // Produces a self-contained .next/standalone folder that Passenger can run
  // without needing node_modules installed on the server for every dependency.
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
  },

  // ─── Performance ────────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Compress responses (Passenger doesn't always do this)
  compress: true,
};

export default nextConfig;
