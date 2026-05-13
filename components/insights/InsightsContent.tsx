"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Search, Clock, ArrowRight, Download } from "lucide-react";

const categories = ["All", "ESG", "Tax", "IFRS", "Governance", "Risk", "Audit", "Public Sector", "Technology"];

const insights = [
  {
    slug: "esg-imperative-kenyan-boards",
    category: "ESG",
    title: "The ESG Imperative: Why Kenyan Boards Must Act Now",
    excerpt: "Environmental, social, and governance factors are rapidly becoming central to investor decisions and regulatory expectations in East Africa. Here's what boards need to know.",
    date: "February 12, 2025",
    readTime: "7 min read",
    author: "ESG Practice Team",
    featured: true,
    downloadable: true,
  },
  {
    slug: "kenya-tax-reform-2025",
    category: "Tax",
    title: "Kenya Tax Reform 2025: Key Changes Every CFO Must Know",
    excerpt: "A comprehensive analysis of the latest tax amendments and their critical implications for corporate taxpayers operating in Kenya.",
    date: "January 28, 2025",
    readTime: "5 min read",
    author: "Tax Advisory Team",
    featured: false,
    downloadable: false,
  },
  {
    slug: "ifrs-17-implementation-lessons",
    category: "IFRS",
    title: "IFRS 17 Implementation: Lessons from Early Adopters",
    excerpt: "Insights from insurance sector IFRS 17 implementations across East Africa, with practical recommendations for organisations still in transition.",
    date: "January 15, 2025",
    readTime: "8 min read",
    author: "IFRS Advisory Team",
    featured: false,
    downloadable: true,
  },
  {
    slug: "cybersecurity-risk-kenya-financial",
    category: "Risk",
    title: "Cybersecurity Risk in the Kenyan Financial Sector",
    excerpt: "As digital banking accelerates, Kenyan financial institutions face mounting cyber threats. An analysis of the current landscape and recommended frameworks.",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "Risk Advisory Team",
    featured: false,
    downloadable: false,
  },
  {
    slug: "board-governance-kenya-2025",
    category: "Governance",
    title: "Board Governance in Kenya: Trends and Challenges for 2025",
    excerpt: "A review of the governance landscape in Kenya — from regulatory requirements to emerging best practice for listed companies, NGOs, and public institutions.",
    date: "November 30, 2024",
    readTime: "9 min read",
    author: "Governance Advisory Team",
    featured: false,
    downloadable: true,
  },
  {
    slug: "public-financial-management-devolution",
    category: "Public Sector",
    title: "Strengthening PFM in Kenya's Devolved System",
    excerpt: "Analysis of public financial management challenges in Kenya's 47 counties and recommendations for improved accountability and service delivery.",
    date: "November 15, 2024",
    readTime: "10 min read",
    author: "Public Sector Advisory",
    featured: false,
    downloadable: true,
  },
  {
    slug: "ifrs-9-expected-credit-loss",
    category: "IFRS",
    title: "IFRS 9 Expected Credit Loss: Practical Application for Kenyan Banks",
    excerpt: "A practical guide to IFRS 9 ECL model development and application for financial institutions in Kenya, including regulatory considerations.",
    date: "October 22, 2024",
    readTime: "12 min read",
    author: "IFRS Advisory Team",
    featured: false,
    downloadable: false,
  },
  {
    slug: "internal-audit-transformation",
    category: "Audit",
    title: "Transforming Internal Audit: The Digital Frontier",
    excerpt: "How data analytics and technology are reshaping internal audit practice in East Africa — and what progressive audit functions are doing differently.",
    date: "October 5, 2024",
    readTime: "7 min read",
    author: "Audit Practice Team",
    featured: false,
    downloadable: false,
  },
];

const categoryColors: Record<string, string> = {
  ESG: "bg-green-50 text-green-700 border border-green-100",
  Tax: "bg-blue-50 text-blue-700 border border-blue-100",
  IFRS: "bg-purple-50 text-purple-700 border border-purple-100",
  Risk: "bg-red-50 text-red-700 border border-red-100",
  Governance: "bg-amber-50 text-amber-700 border border-amber-100",
  Audit: "bg-teal-50 text-teal-700 border border-teal-100",
  "Public Sector": "bg-slate-50 text-slate-700 border border-slate-100",
  Technology: "bg-indigo-50 text-indigo-700 border border-indigo-100",
};

export function InsightsContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = insights.filter((i) => {
    const matchCat = activeCategory === "All" || i.category === activeCategory;
    const matchSearch = search === "" || i.title.toLowerCase().includes(search.toLowerCase()) || i.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search insights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-royal-400 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-navy-900 text-white shadow-enterprise"
                    : "bg-gray-50 text-charcoal-600 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured */}
        {activeCategory === "All" && search === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-8"
          >
            <Link href={`/insights/${filtered[0]?.slug}`} className="insight-card flex flex-col md:flex-row overflow-hidden group">
              <div className="md:w-2/5 h-56 md:h-auto bg-gradient-hero relative flex-shrink-0 flex items-end p-6">
                <div>
                  <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Featured Insight</span>
                  <div className="w-10 h-0.5 bg-gold-400 mt-2" />
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit mb-4 ${categoryColors[filtered[0]?.category]}`}>
                  {filtered[0]?.category}
                </span>
                <h2 className="text-xl font-bold font-heading text-navy-900 mb-3 group-hover:text-royal-500 transition-colors">
                  {filtered[0]?.title}
                </h2>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-5 flex-1">
                  {filtered[0]?.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-charcoal-400">
                    <span>{filtered[0]?.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {filtered[0]?.readTime}</span>
                  </div>
                  <span className="text-sm font-semibold text-royal-500 flex items-center gap-1.5 group-hover:text-gold-500 transition-colors">
                    Read Article <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === "All" && search === "" ? filtered.slice(1) : filtered).map((insight, i) => (
            <motion.div
              key={insight.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={`/insights/${insight.slug}`} className="insight-card flex flex-col h-full group">
                <div className="h-2 bg-gradient-to-r from-navy-900 to-royal-500" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[insight.category]}`}>
                      {insight.category}
                    </span>
                    {insight.downloadable && (
                      <span className="flex items-center gap-1 text-xs text-charcoal-400">
                        <Download size={11} /> PDF
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold font-heading text-navy-900 mb-3 group-hover:text-royal-500 transition-colors leading-snug">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-charcoal-500 leading-relaxed mb-4 flex-1">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="text-xs text-charcoal-400">
                      <p>{insight.author}</p>
                      <p>{insight.date} · {insight.readTime}</p>
                    </div>
                    <ArrowRight size={14} className="text-royal-500 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-charcoal-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">No insights found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
