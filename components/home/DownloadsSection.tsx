"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Download, Wallet, DollarSign, FileText, Users, TrendingDown, Landmark, ArrowRight } from "lucide-react";

const resources = [
  {
    icon: Wallet,
    title: "Cashbook Template",
    description: "Daily income and expense tracking template for SMEs and businesses. Helps you maintain accurate records of all cash movements.",
    filename: "cashbook-template.xlsx",
    category: "Bookkeeping",
  },
  {
    icon: DollarSign,
    title: "Petty Cash Template",
    description: "Track petty cash usage, balances, and reimbursements efficiently. Includes automatic balance calculations.",
    filename: "petty-cash-template.xlsx",
    category: "Bookkeeping",
  },
  {
    icon: FileText,
    title: "Sales Invoice Template",
    description: "Professional invoice template for businesses and consultants. VAT-compliant and formatted for Kenyan businesses.",
    filename: "sales-invoice-template.xlsx",
    category: "Invoicing",
  },
  {
    icon: Users,
    title: "Payroll Template",
    description: "Simple payroll management spreadsheet for employee salary processing. Includes PAYE and NHIF/NSSF calculations.",
    filename: "payroll-template.xlsx",
    category: "HR & Payroll",
  },
  {
    icon: TrendingDown,
    title: "Expense Tracker",
    description: "Monitor operational and business expenses with automated totals. Categorise expenditure for better financial control.",
    filename: "expense-tracker.xlsx",
    category: "Expense Management",
  },
  {
    icon: Landmark,
    title: "Bank Reconciliation Template",
    description: "Excel template for reconciling business bank statements accurately. Identify discrepancies and maintain clean books.",
    filename: "bank-reconciliation-template.xlsx",
    category: "Accounting",
  },
];

export function DownloadsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="downloads" className="section-padding bg-white" ref={ref}>
      <div className="container-enterprise">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="label-enterprise mb-3 inline-flex items-center justify-center gap-2"
          >
            <span className="w-6 h-px bg-gold-400" />
            Free Resources
            <span className="w-6 h-px bg-gold-400" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-md font-bold font-heading text-navy-900 mb-4"
          >
            Free Accounting & Bookkeeping Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal-500 leading-relaxed"
          >
            Download professionally prepared Excel templates, bookkeeping tools, and accounting
            resources designed to support businesses, SMEs, startups, and finance teams across Kenya.
          </motion.p>
        </div>

        {/* Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 pl-5 py-4 bg-navy-50 border-l-4 border-gold-500 rounded-r-xl"
        >
          <p className="text-sm text-navy-800 font-medium">
            Supporting businesses with practical accounting tools and financial management resources.
            All templates are professionally prepared and ready to use — no sign-up required.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group card-enterprise p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Category badge + icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-semibold text-gold-600 bg-gold-50 border border-gold-200 px-3 py-1 rounded-full">
                  {resource.category}
                </span>
                <div className="w-10 h-10 bg-navy-100 rounded-xl flex items-center justify-center group-hover:bg-navy-900 transition-colors duration-300">
                  <resource.icon size={18} className="text-navy-700 group-hover:text-gold-400 transition-colors duration-300" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold font-heading text-navy-900 mb-2 group-hover:text-royal-500 transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-charcoal-500 leading-relaxed mb-6 flex-1">
                {resource.description}
              </p>

              {/* Download Button */}
              <a
                href={`/downloads/${resource.filename}`}
                download
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-gold-500 hover:text-navy-900 transition-all duration-200 group-hover:shadow-enterprise-md"
              >
                <Download size={15} />
                Download Excel File
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-charcoal-500 mb-4">
            Need more advanced accounting support? Our team is here to help.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Speak to an Advisor <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
