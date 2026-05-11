"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight, Users, Award, Globe2, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: CheckCircle2,
    title: "Integrity & Independence",
    description: "We uphold the highest ethical standards in every engagement — delivering objective, unbiased counsel you can rely on.",
  },
  {
    icon: Users,
    title: "Multidisciplinary Expertise",
    description: "Our team combines deep sector knowledge with cross-functional advisory capabilities to solve complex challenges.",
  },
  {
    icon: Globe2,
    title: "Pan-African Reach",
    description: "Local expertise anchored in Nairobi, with reach across East Africa and network affiliations globally.",
  },
  {
    icon: Award,
    title: "International Standards",
    description: "We apply globally recognised frameworks — ISAs, IFRS, ISO, COSO — to every engagement.",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven Advisory",
    description: "We measure success by the outcomes we achieve for your organisation, not just the reports we deliver.",
  },
  {
    icon: CheckCircle2,
    title: "Public-Interest Professionals",
    description: "As ICPAK-registered professionals, we are accountable to the public interest and to the highest professional standards.",
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-gradient-hero rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Commitment</p>
                <h3 className="text-2xl font-bold font-heading mb-4">
                  "We don't just audit your books. We build confidence in your future."
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-8">
                  Every engagement at CPA Otene and Associates LLP is anchored in
                  professional integrity, technical excellence, and a genuine
                  commitment to your institutional success.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-gold-400 font-bold text-xs">CO</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">CPA Otene</p>
                    <p className="text-xs text-white/50">Managing Partner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating metric cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute -right-6 -bottom-6 bg-white rounded-xl shadow-enterprise-lg p-5 border border-gray-100"
            >
              <p className="text-3xl font-bold text-navy-900 font-heading">98%</p>
              <p className="text-xs text-charcoal-500 mt-1">Client satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -left-6 top-6 bg-gold-500 rounded-xl shadow-enterprise-lg p-5"
            >
              <p className="text-3xl font-bold text-white font-heading">25+</p>
              <p className="text-xs text-white/80 mt-1">Years trusted</p>
            </motion.div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="label-enterprise mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-gold-400" />
                Why Choose Us
              </span>
              <h2 className="text-display-md font-bold font-heading text-navy-900 mb-4">
                The trusted advisor for institutions across East Africa
              </h2>
              <p className="text-charcoal-500 leading-relaxed mb-10">
                We combine local knowledge with global expertise to deliver advisory
                services that are practical, actionable, and transformative — creating
                lasting value for every client we serve.
              </p>
            </motion.div>

            <div className="space-y-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <pillar.icon size={18} className="text-navy-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold font-heading text-navy-900 mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-charcoal-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-10"
            >
              <Link href="/about" className="btn-primary">
                Meet Our Team <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
