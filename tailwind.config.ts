import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CPA Otene Brand Palette
        navy: {
          DEFAULT: "#0B1F3A",
          50: "#E8EDF4",
          100: "#C7D3E6",
          200: "#8FA7CC",
          300: "#577BB3",
          400: "#2A5494",
          500: "#123D6B",
          600: "#0E3259",
          700: "#0B2748",
          800: "#071D36",
          900: "#0B1F3A",
          950: "#060F1C",
        },
        royal: {
          DEFAULT: "#123D6B",
          50: "#EBF0F8",
          100: "#C3D5EA",
          200: "#87ABCF",
          300: "#4B82B4",
          400: "#1F5998",
          500: "#123D6B",
          600: "#0E3259",
          700: "#0B2748",
          800: "#071D36",
          900: "#040F1C",
        },
        gold: {
          DEFAULT: "#C8A24D",
          50: "#FDF8EC",
          100: "#F8EDCA",
          200: "#F0D894",
          300: "#E8C35F",
          400: "#DDB136",
          500: "#C8A24D",
          600: "#A8873F",
          700: "#886C31",
          800: "#685223",
          900: "#483815",
        },
        charcoal: {
          DEFAULT: "#1B1F24",
          50: "#F2F3F4",
          100: "#D9DBDD",
          200: "#B2B6BB",
          300: "#8B9199",
          400: "#646D77",
          500: "#3D4855",
          600: "#2D3640",
          700: "#1F262E",
          800: "#1B1F24",
          900: "#0F1215",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "display-xs": ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0B1F3A 0%, #123D6B 100%)",
        "gradient-gold": "linear-gradient(135deg, #C8A24D 0%, #E8C35F 100%)",
        "gradient-hero": "linear-gradient(135deg, #0B1F3A 0%, #0E3259 50%, #123D6B 100%)",
        "gradient-mesh": "radial-gradient(ellipse at top left, #123D6B22 0%, transparent 50%), radial-gradient(ellipse at bottom right, #C8A24D11 0%, transparent 50%)",
      },
      boxShadow: {
        enterprise: "0 4px 6px -1px rgba(11, 31, 58, 0.1), 0 2px 4px -1px rgba(11, 31, 58, 0.06)",
        "enterprise-md": "0 10px 15px -3px rgba(11, 31, 58, 0.1), 0 4px 6px -2px rgba(11, 31, 58, 0.05)",
        "enterprise-lg": "0 20px 25px -5px rgba(11, 31, 58, 0.1), 0 10px 10px -5px rgba(11, 31, 58, 0.04)",
        "enterprise-xl": "0 25px 50px -12px rgba(11, 31, 58, 0.25)",
        gold: "0 0 0 2px rgba(200, 162, 77, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in": "slideIn 0.4s ease-out",
        "count-up": "countUp 2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
