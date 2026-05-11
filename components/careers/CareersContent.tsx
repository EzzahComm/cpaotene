"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Upload, CheckCircle2, Briefcase, MapPin, Clock } from "lucide-react";

const whyJoin = [
  { title: "Professional Development", desc: "Structured learning paths, professional qualifications support (CPA, ACCA, CISA), and continuous CPD opportunities." },
  { title: "Impactful Work", desc: "Work on complex, high-impact engagements for Kenya's most important institutions — enterprises, NGOs, and government." },
  { title: "Collaborative Culture", desc: "A respectful, inclusive environment where your ideas are heard and your contributions are recognised." },
  { title: "Competitive Rewards", desc: "Market-competitive salaries, performance bonuses, health cover, and professional development allowances." },
  { title: "Career Progression", desc: "Clear career paths from graduate to Partner, with mentorship from our senior professionals." },
  { title: "Pan-African Exposure", desc: "Opportunities to work on regional engagements across East Africa and collaborate with international firms." },
];

const openPositions = [
  {
    title: "Audit Senior Associate",
    department: "Audit & Assurance",
    location: "Nairobi",
    type: "Full-time",
    experience: "3–5 years",
    description: "Lead audit engagements for enterprise and institutional clients, applying ISAs and mentoring junior staff.",
    requirements: ["CPA(K) or ACCA qualified", "3+ years audit experience", "ISAs knowledge", "Strong analytical skills"],
  },
  {
    title: "Tax Consultant",
    department: "Tax Advisory",
    location: "Nairobi",
    type: "Full-time",
    experience: "2–4 years",
    description: "Provide tax compliance and advisory services to a diverse portfolio of corporate and institutional clients.",
    requirements: ["CPA(K) qualified", "2+ years tax experience", "KRA systems knowledge", "Excellent communication skills"],
  },
  {
    title: "Risk & Governance Analyst",
    department: "Risk & Governance",
    location: "Nairobi / Kisumu",
    type: "Full-time",
    experience: "1–3 years",
    description: "Support governance advisory and enterprise risk management engagements across financial and public sector clients.",
    requirements: ["Business/Finance degree", "1+ years risk or audit experience", "Governance frameworks knowledge", "Report writing skills"],
  },
  {
    title: "Graduate Trainee — Audit",
    department: "Audit & Assurance",
    location: "Nairobi",
    type: "Graduate Programme",
    experience: "0–1 year",
    description: "Join our structured graduate programme and build your audit career with mentorship from our senior professionals.",
    requirements: ["CPA Part 3 or ACCA Foundation", "Finance/Accounting degree", "Analytical mindset", "Eagerness to learn"],
  },
  {
    title: "ESG & Sustainability Consultant",
    department: "ESG Advisory",
    location: "Nairobi",
    type: "Full-time",
    experience: "2–5 years",
    description: "Develop ESG strategies, sustainability reports, and climate risk frameworks for corporate and institutional clients.",
    requirements: ["Sustainability/Finance background", "GRI or ISSB framework knowledge", "Excellent writing skills", "Project management"],
  },
  {
    title: "Finance & Accounts Intern",
    department: "Operations",
    location: "Nairobi",
    type: "Internship",
    experience: "Student / Graduate",
    description: "A 6-month internship supporting our internal finance and operations team while developing practical professional skills.",
    requirements: ["Pursuing CPA or Finance degree", "MS Office proficiency", "Reliable and detail-oriented", "Strong work ethic"],
  },
];

const departmentColors: Record<string, string> = {
  "Audit & Assurance": "bg-blue-50 text-blue-700 border border-blue-100",
  "Tax Advisory": "bg-emerald-50 text-emerald-700 border border-emerald-100",
  "Risk & Governance": "bg-purple-50 text-purple-700 border border-purple-100",
  "ESG Advisory": "bg-green-50 text-green-700 border border-green-100",
  "Operations": "bg-slate-50 text-slate-700 border border-slate-100",
};

const typeColors: Record<string, string> = {
  "Full-time": "bg-navy-50 text-navy-700",
  "Graduate Programme": "bg-gold-50 text-gold-700",
  "Internship": "bg-orange-50 text-orange-700",
};

export function CareersContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  return (
    <div ref={ref}>
      {/* Why Join */}
      <section className="section-padding bg-white">
        <div className="container-enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <span className="label-enterprise mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" /> Why CPA Otene
            </span>
            <h2 className="text-display-sm font-bold font-heading text-navy-900 mb-3">
              Where professionals grow and thrive
            </h2>
            <p className="text-charcoal-500 max-w-xl">
              We are committed to creating an environment where talented professionals
              can build meaningful careers in professional services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyJoin.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="card-enterprise p-6"
              >
                <CheckCircle2 size={20} className="text-gold-500 mb-3" />
                <h3 className="text-sm font-bold font-heading text-navy-900 mb-2">{item.title}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-gray-50" id="positions">
        <div className="container-enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <span className="label-enterprise mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" /> Open Positions
            </span>
            <h2 className="text-display-sm font-bold font-heading text-navy-900">
              Current opportunities
            </h2>
          </motion.div>

          <div className="space-y-4">
            {openPositions.map((position, i) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.06 }}
                className="card-enterprise p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${departmentColors[position.department] || "bg-gray-100 text-gray-700"}`}>
                        {position.department}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColors[position.type]}`}>
                        {position.type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-heading text-navy-900 mb-1">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs text-charcoal-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {position.experience} experience
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-500 mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {position.requirements.map((req) => (
                        <span key={req} className="text-xs bg-navy-50 text-navy-700 px-2.5 py-1 rounded-full">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => {
                        setSelectedPosition(position.title);
                        setApplyOpen(true);
                      }}
                      className="btn-primary text-sm py-2.5 px-5"
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Open application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mt-8 bg-gradient-hero rounded-2xl p-8 text-white text-center"
          >
            <Briefcase size={32} className="text-gold-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold font-heading mb-2">
              Don't see the right role?
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              We're always open to hearing from talented professionals. Send us your CV and
              tell us how you can contribute to CPA Otene and Associates LLP.
            </p>
            <button
              onClick={() => {
                setSelectedPosition("Open Application");
                setApplyOpen(true);
              }}
              className="btn-gold"
            >
              Submit Open Application <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      {applyOpen && (
        <div className="fixed inset-0 z-50 bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-enterprise-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold font-heading text-navy-900">Apply: {selectedPosition}</h3>
                <p className="text-xs text-charcoal-500 mt-0.5">CPA Otene and Associates LLP</p>
              </div>
              <button onClick={() => setApplyOpen(false)} className="text-charcoal-400 hover:text-navy-900 text-xl leading-none">×</button>
            </div>
            <div className="p-6">
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                alert("Application submitted! We'll be in touch within 5 business days.");
                setApplyOpen(false);
              }}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-charcoal-700 block mb-1.5">First Name *</label>
                    <input required type="text" className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-royal-400 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Last Name *</label>
                    <input required type="text" className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-royal-400 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Email Address *</label>
                  <input required type="email" className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-royal-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Phone Number *</label>
                  <input required type="tel" className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-royal-400 transition-all" />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Why CPA Otene? *</label>
                  <textarea required rows={3} className="w-full border border-gray-200 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-royal-400 transition-all resize-none" placeholder="Briefly tell us why you want to join our team..." />
                </div>
                <div>
                  <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Upload CV (PDF, max 5MB) *</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-royal-300 transition-colors cursor-pointer">
                    <Upload size={24} className="text-charcoal-300 mx-auto mb-2" />
                    <p className="text-xs text-charcoal-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-charcoal-300 mt-1">PDF, DOC up to 5MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Submit Application <ArrowRight size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
