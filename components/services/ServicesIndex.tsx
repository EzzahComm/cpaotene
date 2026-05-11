"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield, Calculator, Scale, BarChart3, FileText, Globe,
  Leaf, Lock, Building2, Briefcase, BookOpen, ArrowRight, CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Audit & Assurance",
    href: "/services/audit-assurance",
    description: "Independent, objective audit services that provide stakeholders with confidence in your financial statements and internal processes.",
    features: ["Financial Statement Audit", "Compliance Audit", "Special Purpose Audits", "Agreed-Upon Procedures"],
    color: "blue",
  },
  {
    icon: Calculator,
    title: "Tax Advisory",
    href: "/services/tax-advisory",
    description: "Strategic tax planning, compliance management, and dispute resolution services tailored to Kenya's complex tax environment.",
    features: ["Corporate Tax Compliance", "Tax Planning & Structuring", "Transfer Pricing", "Tax Dispute Resolution"],
    color: "emerald",
  },
  {
    icon: Scale,
    title: "Governance Advisory",
    href: "/services/governance-advisory",
    description: "Board governance frameworks, institutional policy development, and governance training for enterprises and public institutions.",
    features: ["Board Effectiveness Reviews", "Governance Policy Development", "Board Training", "Institutional Frameworks"],
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Risk & Compliance",
    href: "/services/risk-compliance",
    description: "Enterprise risk management frameworks, regulatory compliance programmes, and risk culture development for institutional resilience.",
    features: ["Enterprise Risk Management", "Regulatory Compliance", "Risk Frameworks", "Risk Culture Assessment"],
    color: "orange",
  },
  {
    icon: FileText,
    title: "Internal Audit",
    href: "/services/internal-audit",
    description: "Comprehensive internal audit services that strengthen controls, improve processes, and enhance accountability.",
    features: ["Internal Audit Outsourcing", "Co-sourcing", "Process Audits", "IT Audits"],
    color: "teal",
  },
  {
    icon: Globe,
    title: "IFRS Advisory",
    href: "/services/ifrs-advisory",
    description: "Expert guidance on IFRS adoption, transition management, and complex accounting judgements.",
    features: ["IFRS Transition", "IFRS 9 & 17 Implementation", "Accounting Policy Reviews", "Technical Opinions"],
    color: "indigo",
  },
  {
    icon: Leaf,
    title: "ESG & Sustainability",
    href: "/services/esg-sustainability",
    description: "ESG strategy development, sustainability reporting, and stakeholder engagement frameworks.",
    features: ["ESG Strategy", "GRI & ISSB Reporting", "Climate Risk Assessment", "Sustainability Assurance"],
    color: "green",
  },
  {
    icon: Lock,
    title: "Cybersecurity Advisory",
    href: "/services/cybersecurity-advisory",
    description: "Cybersecurity risk assessments, framework development, and digital resilience strategies for the modern enterprise.",
    features: ["Cyber Risk Assessment", "Security Framework Design", "Incident Response Planning", "Awareness Training"],
    color: "red",
  },
  {
    icon: Building2,
    title: "Public Sector Advisory",
    href: "/services/public-sector-advisory",
    description: "Specialised advisory for government agencies, SOEs, devolved units, and development organisations.",
    features: ["PFM Advisory", "Devolution Support", "SOE Governance", "Development Partner Reporting"],
    color: "slate",
  },
  {
    icon: Briefcase,
    title: "Financial Advisory",
    href: "/services/financial-advisory",
    description: "Mergers, acquisitions, business valuations, debt restructuring, and transaction advisory services.",
    features: ["Business Valuations", "M&A Advisory", "Due Diligence", "Debt Restructuring"],
    color: "amber",
  },
  {
    icon: BookOpen,
    title: "SME Advisory",
    href: "/services/sme-advisory",
    description: "Tailored advisory services designed for growing SMEs — financial management, governance, and strategic planning.",
    features: ["Financial Management", "Business Strategy", "SME Compliance", "Growth Advisory"],
    color: "cyan",
  },
  {
    icon: Calculator,
    title: "Bookkeeping Services",
    href: "/services/bookkeeping",
    description: "Accurate, professional bookkeeping and financial management services that keep your business compliant and in control.",
    features: ["Monthly Bookkeeping", "Payroll Management", "Management Accounts", "VAT Filing"],
    color: "rose",
  },
];

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
  blue: { icon: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  emerald: { icon: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  purple: { icon: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  orange: { icon: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
  teal: { icon: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
  indigo: { icon: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  green: { icon: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
  red: { icon: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
  slate: { icon: "text-slate-600", bg: "bg-slate-50", border: "border-slate-100" },
  amber: { icon: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  cyan: { icon: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
  rose: { icon: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
};

export function ServicesIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const colors = colorMap[service.color];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={service.href}
                  className="card-enterprise p-7 flex flex-col h-full group"
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                    <service.icon size={22} className={colors.icon} />
                  </div>

                  <h2 className="text-lg font-bold font-heading text-navy-900 mb-3 group-hover:text-royal-500 transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-sm text-charcoal-500 leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-charcoal-600">
                        <CheckCircle2 size={13} className="text-gold-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-royal-500 group-hover:text-gold-500 transition-colors mt-auto pt-4 border-t border-gray-50">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
