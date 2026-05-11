"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe2, Award, Users, Heart } from "lucide-react";

const values = [
  { icon: CheckCircle2, title: "Integrity", desc: "We uphold the highest ethical standards in every engagement — our independence is non-negotiable." },
  { icon: Award, title: "Excellence", desc: "We apply rigorous professional standards and continuous learning to deliver world-class advisory." },
  { icon: Users, title: "Partnership", desc: "We work alongside our clients as long-term partners committed to their institutional success." },
  { icon: Globe2, title: "Pan-African Vision", desc: "We are proudly Kenyan, with the capability and ambition to serve organisations across Africa." },
  { icon: Heart, title: "Social Responsibility", desc: "We are invested in the growth of Kenyan institutions and the prosperity of the communities we serve." },
];

const leadership = [
  {
    name: "CPA Otene",
    title: "Managing Partner",
    qualifications: "CPA(K), MBA, CISA",
    bio: "With over 25 years of professional experience in audit, governance, and advisory, CPA Otene leads the firm's strategic direction and manages key institutional relationships across East Africa.",
    expertise: ["Audit & Assurance", "Governance Advisory", "Public Sector"],
  },
  {
    name: "Director of Tax Advisory",
    title: "Director, Tax Advisory",
    qualifications: "CPA(K), LLB, Tax Law Specialist",
    bio: "A tax law expert with extensive experience advising corporates, multinationals, and institutions on Kenyan and East African tax matters including structuring, compliance, and dispute resolution.",
    expertise: ["Corporate Tax", "Transfer Pricing", "Tax Disputes"],
  },
  {
    name: "Director, Risk & Governance",
    title: "Director, Risk & Governance",
    qualifications: "CPA(K), CRMA, CIA",
    bio: "A governance and risk specialist who has designed enterprise risk frameworks for some of East Africa's largest financial institutions, NGOs, and listed companies.",
    expertise: ["Enterprise Risk", "Internal Audit", "Board Governance"],
  },
  {
    name: "Director, IFRS & Advisory",
    title: "Director, Financial Advisory",
    qualifications: "CPA(K), CFA, ACCA",
    bio: "Leading the firm's IFRS advisory and financial transactions practice, with deep expertise in complex accounting standards, business valuations, and corporate restructuring.",
    expertise: ["IFRS Advisory", "Valuations", "M&A Advisory"],
  },
];

export function AboutContent() {
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const leaderRef = useRef<HTMLDivElement>(null);
  const missionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const leaderInView = useInView(leaderRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* Mission & Vision */}
      <section className="section-padding bg-white" ref={missionRef}>
        <div className="container-enterprise">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="label-enterprise mb-4 flex items-center gap-2">
                <span className="w-6 h-px bg-gold-400" /> Who We Are
              </span>
              <h2 className="text-display-sm font-bold font-heading text-navy-900 mb-5">
                A firm built on trust and a commitment to excellence
              </h2>
              <p className="text-charcoal-600 leading-relaxed mb-5">
                CPA Otene and Associates LLP is a distinguished Kenyan professional services firm
                founded on the principle that audit, governance, and advisory must go beyond
                compliance to create genuine institutional value.
              </p>
              <p className="text-charcoal-600 leading-relaxed mb-5">
                We serve Kenya's most important institutions — enterprises, government agencies,
                NGOs, SACCOs, banks, insurance firms, and development organisations — providing
                advisory that is technically rigorous, practically relevant, and strategically sound.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Our professionals are registered with ICPAK, holders of internationally recognised
                qualifications, and experienced in applying global standards — ISAs, IFRS, COSO,
                ISO — to the East African context.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5"
            >
              {[
                {
                  title: "Our Mission",
                  content: "To deliver trusted, independent, and transformative professional services that build institutional confidence, strengthen governance, and create lasting value for organisations across East Africa.",
                  border: "border-l-gold-400",
                },
                {
                  title: "Our Vision",
                  content: "To be the most trusted and respected professional services firm in East Africa — known for our integrity, expertise, and commitment to the public interest.",
                  border: "border-l-royal-500",
                },
                {
                  title: "Our Purpose",
                  content: "Building trust beyond numbers — because we believe that confident, well-governed organisations are the foundation of a prosperous East Africa.",
                  border: "border-l-navy-900",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`border-l-4 ${item.border} pl-6 py-4 bg-gray-50 rounded-r-xl`}
                >
                  <h3 className="text-base font-bold font-heading text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50" ref={valuesRef}>
        <div className="container-enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <span className="label-enterprise mb-3 flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-gold-400" /> Our Core Values <span className="w-6 h-px bg-gold-400" />
            </span>
            <h2 className="text-display-sm font-bold font-heading text-navy-900">
              The principles that guide everything we do
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="card-enterprise p-6 text-center"
              >
                <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={22} className="text-navy-700" />
                </div>
                <h3 className="font-bold font-heading text-navy-900 mb-2">{value.title}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white" id="leadership" ref={leaderRef}>
        <div className="container-enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={leaderInView ? { opacity: 1, y: 0 } : {}}
            className="mb-14"
          >
            <span className="label-enterprise mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" /> Our People
            </span>
            <h2 className="text-display-sm font-bold font-heading text-navy-900">
              Leadership that inspires confidence
            </h2>
            <p className="text-charcoal-500 mt-3 max-w-xl">
              Our leadership team brings together decades of professional experience across audit,
              tax, governance, risk, and advisory — united by a shared commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                animate={leaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="card-enterprise p-7 flex flex-col sm:flex-row gap-5"
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-navy rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-gold-400 text-xl font-bold font-heading">
                    {person.name[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold font-heading text-navy-900">{person.name}</h3>
                  <p className="text-xs text-royal-500 font-medium mb-0.5">{person.title}</p>
                  <p className="text-xs text-gold-600 font-medium mb-3">{person.qualifications}</p>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-4">{person.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {person.expertise.map((exp) => (
                      <span key={exp} className="text-xs bg-navy-50 text-navy-700 px-2.5 py-1 rounded-full font-medium">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="container-enterprise text-center">
          <h2 className="text-display-sm font-bold font-heading text-white mb-4">
            Ready to partner with us?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Discover how CPA Otene and Associates LLP can serve your organisation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Book a Consultation <ArrowRight size={16} />
            </Link>
            <Link href="/services" className="btn-ghost-white">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
