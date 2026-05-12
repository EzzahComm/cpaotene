"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Landmark, Shield, Building2, Heart, HeartPulse, Home, Zap, Cpu, TrendingUp, ShoppingBag, Car, Briefcase } from "lucide-react";

const industries = [
  {
    name: "Banking & Financial Services",
    slug: "banking",
    icon: Landmark,
    color: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100", hover: "hover:border-blue-300" },
    description: "Audit, governance, risk, and compliance advisory tailored to Kenya's banking sector regulatory environment.",
    challenges: ["CBK regulatory compliance", "IFRS 9 ECL implementation", "Credit risk governance", "AML/CFT frameworks"],
    services: ["Audit & Assurance", "Risk & Compliance", "IFRS Advisory", "Governance Advisory"],
  },
  {
    name: "Insurance",
    slug: "insurance",
    icon: Shield,
    color: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100", hover: "hover:border-purple-300" },
    description: "Technical insurance audit, IFRS 17 implementation support, and actuarial-aligned advisory for underwriters and brokers.",
    challenges: ["IFRS 17 transition", "IRA compliance", "Reserving adequacy", "Policyholder fund governance"],
    services: ["IFRS Advisory", "Audit & Assurance", "Risk & Compliance", "Governance Advisory"],
  },
  {
    name: "Public Sector & Government",
    slug: "public-sector",
    icon: Building2,
    color: { bg: "bg-slate-50", icon: "text-slate-600", border: "border-slate-100", hover: "hover:border-slate-300" },
    description: "Public financial management, performance audit, and governance advisory for ministries, counties, and state corporations.",
    challenges: ["PFMA compliance", "County governance", "SOE accountability", "Development partner reporting"],
    services: ["Public Sector Advisory", "Internal Audit", "Governance Advisory", "Risk & Compliance"],
  },
  {
    name: "NGOs & Not-for-Profit",
    slug: "ngo-not-for-profit",
    icon: Heart,
    color: { bg: "bg-rose-50", icon: "text-rose-600", border: "border-rose-100", hover: "hover:border-rose-300" },
    description: "Donor compliance audit, governance frameworks, and financial management advisory for development organisations.",
    challenges: ["Donor compliance audit", "Board governance", "Grant management", "NGO Board registration"],
    services: ["Audit & Assurance", "Governance Advisory", "Internal Audit", "Tax Advisory"],
  },
  {
    name: "Healthcare & Life Sciences",
    slug: "healthcare",
    icon: HeartPulse,
    color: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-100", hover: "hover:border-red-300" },
    description: "Audit, tax, and governance advisory for hospitals, clinics, pharmaceutical companies, and health sector NGOs.",
    challenges: ["Regulatory compliance", "Healthcare governance", "Cost management audit", "Research fund management"],
    services: ["Audit & Assurance", "Tax Advisory", "Governance Advisory", "ESG & Sustainability"],
  },
  {
    name: "Real Estate & Construction",
    slug: "real-estate",
    icon: Home,
    color: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-100", hover: "hover:border-amber-300" },
    description: "Tax structuring, audit, and financial advisory for property developers, REITs, and construction firms.",
    challenges: ["REIT compliance", "Project finance audit", "VAT and stamp duty", "Property valuation"],
    services: ["Tax Advisory", "Audit & Assurance", "Financial Advisory", "Bookkeeping Services"],
  },
  {
    name: "Energy & Natural Resources",
    slug: "energy",
    icon: Zap,
    color: { bg: "bg-yellow-50", icon: "text-yellow-600", border: "border-yellow-100", hover: "hover:border-yellow-300" },
    description: "Specialised audit, ESG reporting, and regulatory compliance for energy, mining, and natural resource companies.",
    challenges: ["Environmental compliance", "ESG reporting", "Revenue management", "Joint venture audit"],
    services: ["Audit & Assurance", "ESG & Sustainability", "Tax Advisory", "Risk & Compliance"],
  },
  {
    name: "Technology & Telecoms",
    slug: "technology",
    icon: Cpu,
    color: { bg: "bg-cyan-50", icon: "text-cyan-600", border: "border-cyan-100", hover: "hover:border-cyan-300" },
    description: "Cybersecurity risk, tax advisory, and financial audit for technology companies and telecommunications firms.",
    challenges: ["Cybersecurity governance", "Digital tax compliance", "Software revenue recognition", "Regulatory compliance"],
    services: ["Cybersecurity Advisory", "Tax Advisory", "Audit & Assurance", "Risk & Compliance"],
  },
  {
    name: "Private Equity & Investment",
    slug: "private-equity",
    icon: TrendingUp,
    color: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100", hover: "hover:border-emerald-300" },
    description: "Due diligence, portfolio company audit, and tax structuring advisory for private equity firms and investment funds.",
    challenges: ["Financial due diligence", "Portfolio governance", "Tax structuring", "Fund accounting"],
    services: ["Financial Advisory", "Audit & Assurance", "Tax Advisory", "Governance Advisory"],
  },
  {
    name: "Retail & Consumer",
    slug: "retail",
    icon: ShoppingBag,
    color: { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-100", hover: "hover:border-pink-300" },
    description: "Audit, tax compliance, and inventory management advisory for retail chains, FMCG companies, and consumer brands.",
    challenges: ["Inventory control audit", "VAT compliance", "Transfer pricing", "Cost management"],
    services: ["Audit & Assurance", "Tax Advisory", "Bookkeeping Services", "Internal Audit"],
  },
  {
    name: "SACCOs & Microfinance",
    slug: "saccos",
    icon: Briefcase,
    color: { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-100", hover: "hover:border-teal-300" },
    description: "SASRA compliance audit, governance frameworks, and financial management advisory for deposit-taking SACCOs.",
    challenges: ["SASRA regulatory compliance", "Loan portfolio audit", "SACCO governance", "Capital adequacy"],
    services: ["Audit & Assurance", "Governance Advisory", "Risk & Compliance", "Internal Audit"],
  },
  {
    name: "Manufacturing",
    slug: "manufacturing",
    icon: Car,
    color: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-100", hover: "hover:border-orange-300" },
    description: "Audit, costing review, and tax advisory for manufacturing companies operating in Kenya's industrial sector.",
    challenges: ["Cost audit", "Excise duty compliance", "Transfer pricing", "Supply chain risk"],
    services: ["Audit & Assurance", "Tax Advisory", "Internal Audit", "Bookkeeping Services"],
  },
];

export function IndustriesPageContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className={`card-enterprise p-7 flex flex-col h-full group border ${industry.color.border} ${industry.color.hover} transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${industry.color.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <industry.icon size={22} className={industry.color.icon} />
                </div>
                <h2 className="text-base font-bold font-heading text-navy-900 mb-3 group-hover:text-royal-500 transition-colors">
                  {industry.name}
                </h2>
                <p className="text-sm text-charcoal-500 leading-relaxed mb-5 flex-1">
                  {industry.description}
                </p>

                {/* Key challenges */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-charcoal-400 uppercase tracking-wider mb-2">Key Challenges</p>
                  <div className="flex flex-wrap gap-1.5">
                    {industry.challenges.map((c) => (
                      <span key={c} className="text-xs bg-gray-50 text-charcoal-600 px-2.5 py-1 rounded-full border border-gray-100">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-royal-500 group-hover:text-gold-500 transition-colors pt-4 border-t border-gray-50">
                  Explore Sector <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
