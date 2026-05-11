"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Landmark, Car, Building2, Briefcase, Zap, HeartPulse,
  Shield, FlaskConical, Tv, Heart, TrendingUp, Scale,
  Home, ShoppingBag, Cpu, Radio, Plane, ArrowRight
} from "lucide-react";

const industries = [
  { name: "Banking & Finance", icon: Landmark, href: "/industries/banking", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Insurance", icon: Shield, href: "/industries/insurance", color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Public Sector", icon: Building2, href: "/industries/public-sector", color: "text-slate-600", bg: "bg-slate-50" },
  { name: "NGO & Non-Profit", icon: Heart, href: "/industries/ngo-not-for-profit", color: "text-rose-600", bg: "bg-rose-50" },
  { name: "Healthcare", icon: HeartPulse, href: "/industries/healthcare", color: "text-red-600", bg: "bg-red-50" },
  { name: "Real Estate", icon: Home, href: "/industries/real-estate", color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Energy & Resources", icon: Zap, href: "/industries/energy", color: "text-yellow-600", bg: "bg-yellow-50" },
  { name: "Technology", icon: Cpu, href: "/industries/technology", color: "text-cyan-600", bg: "bg-cyan-50" },
  { name: "Private Equity", icon: TrendingUp, href: "/industries/private-equity", color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Retail & Consumer", icon: ShoppingBag, href: "/industries/retail", color: "text-pink-600", bg: "bg-pink-50" },
  { name: "Telecommunications", icon: Radio, href: "/industries/technology", color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "Travel & Tourism", icon: Plane, href: "/industries/travel", color: "text-sky-600", bg: "bg-sky-50" },
];

export function IndustriesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container-enterprise relative z-10" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="label-enterprise mb-3 flex items-center"
            >
              <span className="w-6 h-px bg-gold-400 mr-2" />
              Sectors We Serve
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-display-md font-bold font-heading text-white"
            >
              Deep expertise across every sector
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white/55 mt-3 max-w-xl text-sm"
            >
              We bring specialised knowledge to every industry we serve, understanding
              the unique regulatory, financial, and operational challenges each faces.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/industries" className="btn-ghost-white text-sm">
              All Industries <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                href={ind.href}
                className="flex flex-col items-center gap-3 p-5 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-gold-400/30 rounded-xl transition-all duration-200 group text-center"
              >
                <div className={`w-11 h-11 ${ind.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <ind.icon size={20} className={ind.color} />
                </div>
                <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors leading-tight">
                  {ind.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
