"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight, CheckCircle2, User } from "lucide-react";

interface RelatedInsight {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

interface InsightArticleProps {
  insight: {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    author: string;
    authorTitle: string;
    body: string[];
    keyTakeaways: string[];
  };
  relatedInsights: RelatedInsight[];
}

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

export function InsightArticle({ insight, relatedInsights }: InsightArticleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-gray-100">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[insight.category] || "bg-gray-100 text-gray-700"}`}>
                {insight.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-charcoal-400">
                <Clock size={12} /> {insight.readTime}
              </span>
              <span className="text-xs text-charcoal-400">{insight.date}</span>
              <div className="flex items-center gap-2 ml-auto">
                <div className="w-7 h-7 bg-navy-100 rounded-full flex items-center justify-center">
                  <User size={13} className="text-navy-700" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy-900">{insight.author}</p>
                  <p className="text-xs text-charcoal-400">{insight.authorTitle}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="prose-article space-y-5">
              {insight.body.map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h2 key={i} className="text-xl font-bold font-heading text-navy-900 mt-8 mb-2">
                      {paragraph.replace(/\*\*/g, "")}
                    </h2>
                  );
                }
                return (
                  <p key={i} className="text-charcoal-600 leading-relaxed text-[15px]">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-hero rounded-2xl text-white">
              <h3 className="text-lg font-bold font-heading mb-2">
                Speak with our advisors
              </h3>
              <p className="text-white/60 text-sm mb-5">
                Our specialists can provide tailored advice on the topics covered in this insight.
              </p>
              <Link href="/contact" className="btn-gold">
                Book a Consultation <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Key Takeaways */}
            <div className="card-enterprise p-6">
              <h4 className="text-sm font-bold font-heading text-navy-900 mb-4 flex items-center gap-2">
                <div className="w-5 h-5 bg-gold-50 rounded flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-gold-500" />
                </div>
                Key Takeaways
              </h4>
              <ul className="space-y-3">
                {insight.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0 mt-1.5" />
                    <span className="text-xs text-charcoal-600 leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Insights */}
            {relatedInsights.length > 0 && (
              <div className="card-enterprise p-6">
                <h4 className="text-sm font-bold font-heading text-navy-900 mb-4">
                  Related Insights
                </h4>
                <div className="space-y-4">
                  {relatedInsights.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/insights/${related.slug}`}
                      className="block group"
                    >
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[related.category] || "bg-gray-100 text-gray-700"}`}>
                        {related.category}
                      </span>
                      <p className="text-xs font-semibold text-navy-900 mt-1.5 group-hover:text-royal-500 transition-colors leading-snug">
                        {related.title}
                      </p>
                      <p className="text-xs text-charcoal-400 mt-0.5">{related.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to insights */}
            <Link
              href="/insights"
              className="flex items-center gap-2 text-sm font-semibold text-royal-500 hover:text-gold-500 transition-colors"
            >
              <ArrowRight size={14} className="rotate-180" />
              All Insights
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
