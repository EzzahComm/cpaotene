"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";

interface IndustryDetailProps {
  industry: {
    overview: string;
    challenges: string[];
    ourApproach: string[];
    keyServices: string[];
    whyUs: string[];
  };
}

export function IndustryDetail({ industry }: IndustryDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {/* Overview + Key Challenges */}
      <section className="section-padding bg-white">
        <div className="container-enterprise">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="label-enterprise mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-gold-400" /> Sector Overview
                </span>
                <p className="text-charcoal-600 leading-relaxed text-lg">
                  {industry.overview}
                </p>
              </motion.div>

              {/* Key Challenges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={18} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-navy-900">
                    Sector Challenges
                  </h2>
                </div>
                <ul className="space-y-3">
                  {industry.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-600 text-sm leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Our Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb size={18} className="text-navy-700" />
                  </div>
                  <h2 className="text-xl font-bold font-heading text-navy-900">
                    Our Approach
                  </h2>
                </div>
                <div className="space-y-3">
                  {industry.ourApproach.map((step, i) => (
                    <div key={step} className="flex items-start gap-4">
                      <div className="w-7 h-7 bg-navy-900 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold-400 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-charcoal-600 text-sm pt-1 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              {/* Key Services */}
              <div className="card-enterprise p-6">
                <h4 className="text-sm font-bold font-heading text-navy-900 mb-4">
                  Services for This Sector
                </h4>
                <ul className="space-y-2">
                  {industry.keyServices.map((service) => (
                    <li key={service} className="flex items-center gap-2.5">
                      <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0" />
                      <span className="text-xs text-charcoal-600">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Us */}
              <div className="card-enterprise p-6">
                <h4 className="text-sm font-bold font-heading text-navy-900 mb-4">
                  Why CPA Otene
                </h4>
                <ul className="space-y-3">
                  {industry.whyUs.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-charcoal-600 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-gradient-hero rounded-xl p-6 text-white">
                <h4 className="text-sm font-bold font-heading mb-2">
                  Ready to discuss your sector needs?
                </h4>
                <p className="text-xs text-white/60 mb-4">
                  Speak with an advisor who understands your industry's specific challenges.
                </p>
                <Link href="/contact" className="btn-gold w-full justify-center text-sm py-2.5">
                  Book Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container-enterprise text-center">
          <h2 className="text-display-sm font-bold font-heading text-navy-900 mb-4">
            Explore our full range of services
          </h2>
          <p className="text-charcoal-500 mb-8 max-w-xl mx-auto text-sm">
            Our advisory extends across audit, tax, governance, risk, and financial advisory — tailored to your sector's needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/services" className="btn-primary">
              View All Services <ArrowRight size={16} />
            </Link>
            <Link href="/industries" className="btn-outline">
              All Industries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
