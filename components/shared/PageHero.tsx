"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  cta?: { label: string; href: string };
  size?: "default" | "large" | "compact";
}

export function PageHero({
  label,
  title,
  titleHighlight,
  description,
  breadcrumbs,
  cta,
  size = "default",
}: PageHeroProps) {
  const paddingMap = {
    compact: "pt-24 pb-14",
    default: "pt-28 pb-20",
    large: "pt-32 pb-24",
  };

  return (
    <section className={`bg-gradient-hero relative overflow-hidden ${paddingMap[size]}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-royal-500/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-grid)" />
        </svg>
      </div>

      <div className="container-enterprise relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 text-xs text-white/40 mb-8"
          >
            <Link href="/" className="hover:text-white/70 transition-colors flex items-center gap-1">
              <Home size={11} /> Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={10} className="text-white/25" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white/70 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div className="max-w-3xl">
          {label && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-6 h-px bg-gold-400" />
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-[0.15em]">
                {label}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-4xl md:text-5xl lg:text-display-lg font-bold font-heading text-white leading-tight mb-5"
          >
            {title}
            {titleHighlight && (
              <>
                {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                  {titleHighlight}
                </span>
              </>
            )}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8"
            >
              <Link href={cta.href} className="btn-gold">
                {cta.label}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
