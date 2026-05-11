"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield, Calculator, Scale, BarChart3, FileText, Globe,
  Leaf, Lock, Building2, Briefcase, BookOpen, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Audit & Assurance",
    description: "Independent, rigorous audit services that inspire confidence in your financial statements and internal processes.",
    href: "/services/audit-assurance",
    color: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: Calculator,
    title: "Tax Advisory",
    description: "Strategic tax planning, compliance management, and dispute resolution to optimise your tax position.",
    href: "/services/tax-advisory",
    color: "from-emerald-50 to-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    icon: Scale,
    title: "Governance Advisory",
    description: "Board effectiveness, institutional frameworks, and governance policies aligned with best-in-class standards.",
    href: "/services/governance-advisory",
    color: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    icon: BarChart3,
    title: "Risk & Compliance",
    description: "Enterprise risk management, regulatory compliance, and risk culture development for institutional resilience.",
    href: "/services/risk-compliance",
    color: "from-orange-50 to-orange-100",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    icon: FileText,
    title: "Internal Audit",
    description: "Comprehensive internal audit services that strengthen controls, improve processes, and enhance accountability.",
    href: "/services/internal-audit",
    color: "from-teal-50 to-teal-100",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
  },
  {
    icon: Globe,
    title: "IFRS Advisory",
    description: "Expert guidance on International Financial Reporting Standards adoption, transition, and complex accounting matters.",
    href: "/services/ifrs-advisory",
    color: "from-indigo-50 to-indigo-100",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
  },
  {
    icon: Leaf,
    title: "ESG & Sustainability",
    description: "Environmental, social, and governance strategy, reporting frameworks, and stakeholder communication.",
    href: "/services/esg-sustainability",
    color: "from-green-50 to-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Lock,
    title: "Cybersecurity Advisory",
    description: "Digital risk assessments, cybersecurity frameworks, and resilience strategies for the modern enterprise.",
    href: "/services/cybersecurity-advisory",
    color: "from-red-50 to-red-100",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
  {
    icon: Building2,
    title: "Public Sector Advisory",
    description: "Specialised advisory for government entities, devolved units, SOEs, and development organisations.",
    href: "/services/public-sector-advisory",
    color: "from-slate-50 to-slate-100",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    icon: Briefcase,
    title: "Financial Advisory",
    description: "Mergers, acquisitions, business valuations, restructuring, and transaction support services.",
    href: "/services/financial-advisory",
    color: "from-amber-50 to-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    icon: BookOpen,
    title: "SME Advisory",
    description: "Tailored advisory for growing SMEs — from financial management to business strategy and compliance.",
    href: "/services/sme-advisory",
    color: "from-cyan-50 to-cyan-100",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-700",
  },
  {
    icon: Calculator,
    title: "Bookkeeping",
    description: "Accurate, reliable bookkeeping and financial management services that keep your business on track.",
    href: "/services/bookkeeping",
    color: "from-rose-50 to-rose-100",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700",
  },
];

export function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-gray-50 mesh-bg">
      <div className="container-enterprise" ref={ref}>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-enterprise mb-3 flex items-center"
            >
              <span className="w-6 h-px bg-gold-400 mr-2" />
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-md font-bold font-heading text-navy-900 max-w-xl"
            >
              Comprehensive advisory for every challenge
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/services" className="btn-primary">
              View All Services <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={service.href}
                className="service-card block h-full group"
              >
                <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={22} className={service.iconColor} />
                </div>
                <h3 className="text-base font-semibold font-heading text-navy-900 mb-2 group-hover:text-royal-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-royal-500 group-hover:text-gold-500 transition-colors mt-auto">
                  Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
