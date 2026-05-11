"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";

const insights = [
  {
    category: "ESG",
    title: "The ESG Imperative: Why Kenyan Boards Must Act Now",
    excerpt: "Environmental, social, and governance factors are rapidly becoming central to investor decisions and regulatory expectations in East Africa. Here's what boards need to know.",
    date: "February 2025",
    readTime: "7 min read",
    href: "/insights/esg-imperative-kenyan-boards",
    tag: "Governance",
    featured: true,
  },
  {
    category: "Tax",
    title: "Kenya Tax Reform 2025: Key Changes Every CFO Must Know",
    excerpt: "A comprehensive analysis of the latest tax amendments and their implications for corporate taxpayers operating in Kenya.",
    date: "January 2025",
    readTime: "5 min read",
    href: "/insights/kenya-tax-reform-2025",
    tag: "Tax Advisory",
    featured: false,
  },
  {
    category: "IFRS",
    title: "IFRS 17 Implementation: Lessons from Early Adopters",
    excerpt: "Insights from insurance sector IFRS 17 implementations across East Africa, with practical recommendations for organisations still in transition.",
    date: "January 2025",
    readTime: "8 min read",
    href: "/insights/ifrs-17-implementation-lessons",
    tag: "IFRS",
    featured: false,
  },
  {
    category: "Risk",
    title: "Cybersecurity Risk in the Kenyan Financial Sector",
    excerpt: "As digital banking accelerates, Kenyan financial institutions face mounting cyber threats. An analysis of the current landscape and recommended frameworks.",
    date: "December 2024",
    readTime: "6 min read",
    href: "/insights/cybersecurity-risk-kenya-financial",
    tag: "Cybersecurity",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  ESG: "bg-green-50 text-green-700 border border-green-100",
  Tax: "bg-blue-50 text-blue-700 border border-blue-100",
  IFRS: "bg-purple-50 text-purple-700 border border-purple-100",
  Risk: "bg-red-50 text-red-700 border border-red-100",
};

export function InsightsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = insights[0];
  const rest = insights.slice(1);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="label-enterprise mb-3 flex items-center"
            >
              <span className="w-6 h-px bg-gold-400 mr-2" />
              Thought Leadership
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-display-md font-bold font-heading text-navy-900"
            >
              Insights from our experts
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="/insights" className="btn-outline text-sm">
              All Insights <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>

        {/* Layout: Featured + 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <Link href={featured.href} className="insight-card h-full flex flex-col">
              {/* Image placeholder */}
              <div className="h-56 bg-gradient-hero relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 flex items-end p-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                </div>
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-xl font-bold font-heading text-navy-900 mb-3 group-hover:text-royal-500 transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-6 flex-1">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-charcoal-400">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-royal-500 group-hover:text-gold-500 transition-colors">
                    Read Article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((insight, i) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex-1"
              >
                <Link href={insight.href} className="insight-card flex flex-col h-full p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[insight.category]}`}>
                      {insight.category}
                    </span>
                    <span className="text-xs text-charcoal-400 flex items-center gap-1">
                      <Clock size={10} /> {insight.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold font-heading text-navy-900 mb-2 leading-snug group-hover:text-royal-500 transition-colors">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-2 flex-1">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs text-charcoal-400">{insight.date}</span>
                    <span className="text-xs font-semibold text-royal-500 flex items-center gap-1">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
