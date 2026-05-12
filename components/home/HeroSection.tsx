"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Mesh overlays */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(18, 61, 107, 0.6) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(200, 162, 77, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(11, 31, 58, 0.8) 0%, transparent 40%)
            `,
          }}
        />

        {/* Abstract geometric patterns */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Glowing orbs */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500 rounded-full blur-[120px] opacity-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-royal-400 rounded-full blur-[100px] opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-enterprise pt-20 pb-16">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-gold-400" />
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Kenya's Premier Advisory Firm
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-display-xl font-bold font-heading text-white leading-[1.08] mb-6"
          >
            Going Beyond
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              Compliance.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg md:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl"
          >
            CPA Otene and Associates LLP delivers trusted audit, governance, tax, and
            advisory solutions for institutions shaping the future of Africa. We build
            confidence in your numbers — and your future.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link href="/contact" className="btn-gold text-sm py-3.5 px-7 text-base font-semibold">
              Book a Consultation
              <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn-ghost-white text-sm py-3.5 px-7 text-base font-semibold">
              Explore Services
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-6 items-center"
          >
            {[
              "ICPAK Registered",
              "ISO 9001:2015",
              "Pan-African Coverage",
              "25+ Years Experience",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                <span className="text-xs text-white/50 font-medium">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating stats panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6 w-52">
          {[
            { value: "25+", label: "Years of Excellence" },
            { value: "500+", label: "Enterprise Clients" },
            { value: "15+", label: "Industries Served" },
            { value: "4", label: "Kenyan Cities" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white font-heading">{stat.value}</p>
              <p className="text-xs text-white/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
