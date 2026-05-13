"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ServiceDetailProps {
  service: {
    overview: string;
    challenges: string[];
    methodology: string[];
    benefits: string[];
    industries: string[];
  };
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-enterprise">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
              >
                <span className="label-enterprise mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-gold-400" /> Overview
                </span>
                <h2 className="text-display-sm font-bold font-heading text-navy-900 mb-5">
                  What we deliver
                </h2>
                <p className="text-charcoal-600 leading-relaxed text-lg mb-10">
                  {service.overview}
                </p>

                {/* Challenges */}
                <h3 className="text-xl font-bold font-heading text-navy-900 mb-4">
                  Challenges we solve
                </h3>
                <ul className="space-y-3 mb-10">
                  {service.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-600 text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>

                {/* Methodology */}
                <h3 className="text-xl font-bold font-heading text-navy-900 mb-4">
                  Our approach
                </h3>
                <div className="space-y-3">
                  {service.methodology.map((step, i) => (
                    <div key={step} className="flex items-start gap-4">
                      <div className="w-7 h-7 bg-navy-900 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold-400 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-charcoal-600 text-sm pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              {/* Benefits */}
              <div className="card-enterprise p-6">
                <h4 className="text-sm font-bold font-heading text-navy-900 mb-4">
                  Key Benefits
                </h4>
                <ul className="space-y-2.5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-charcoal-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industries */}
              <div className="card-enterprise p-6">
                <h4 className="text-sm font-bold font-heading text-navy-900 mb-4">
                  Industries Served
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.industries.map((industry) => (
                    <span
                      key={industry}
                      className="text-xs bg-navy-50 text-navy-700 px-3 py-1.5 rounded-full font-medium"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-gradient-hero rounded-xl p-6 text-white">
                <h4 className="text-sm font-bold font-heading mb-2">Ready to get started?</h4>
                <p className="text-xs text-white/60 mb-4">
                  Speak with one of our advisors about how we can support your organisation.
                </p>
                <Link
                  href="/contact"
                  className="btn-gold w-full justify-center text-sm py-2.5"
                >
                  Book Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
