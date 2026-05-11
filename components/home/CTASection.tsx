"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-navy-900 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-royal-500/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>

      <div className="container-enterprise relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="label-enterprise mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" />
              Start Your Journey
            </span>
            <h2 className="text-display-md font-bold font-heading text-white mb-5">
              Ready to build trust in your numbers?
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Connect with our advisors today. Whether you need audit assurance, governance
              guidance, tax advisory, or strategic counsel — we're ready to help your
              organisation move forward with confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-gold py-3.5 px-7">
                Book a Consultation <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-ghost-white py-3.5 px-7">
                Explore Services
              </Link>
            </div>

            {/* Quick contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: Phone, label: "Call Us", value: "+254 700 000 000", href: "tel:+254700000000" },
                { icon: Mail, label: "Email Us", value: "info@cpaotene.co.ke", href: "mailto:info@cpaotene.co.ke" },
                { icon: MapPin, label: "Visit Us", value: "Nairobi, Kenya", href: "/contact#offices" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 group-hover:border-gold-400/30 transition-all">
                    <Icon size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{label}</p>
                    <p className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact mini form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-lg font-bold font-heading text-white mb-2">
                Request a Consultation
              </h3>
              <p className="text-white/50 text-sm mb-6">
                Tell us about your needs and we'll connect you with the right advisor within 24 hours.
              </p>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/50 block mb-1.5">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm rounded-lg px-4 py-3 outline-none focus:border-gold-400/50 transition-colors"
                      placeholder="James"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/50 block mb-1.5">Last Name</label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm rounded-lg px-4 py-3 outline-none focus:border-gold-400/50 transition-colors"
                      placeholder="Ochieng"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/50 block mb-1.5">Organisation</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm rounded-lg px-4 py-3 outline-none focus:border-gold-400/50 transition-colors"
                    placeholder="Your organisation name"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm rounded-lg px-4 py-3 outline-none focus:border-gold-400/50 transition-colors"
                    placeholder="james@organisation.co.ke"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/50 block mb-1.5">Service Required</label>
                  <select
                    className="w-full bg-white/5 border border-white/10 text-white/70 text-sm rounded-lg px-4 py-3 outline-none focus:border-gold-400/50 transition-colors"
                  >
                    <option value="">Select a service...</option>
                    <option>Audit & Assurance</option>
                    <option>Tax Advisory</option>
                    <option>Governance Advisory</option>
                    <option>Risk & Compliance</option>
                    <option>IFRS Advisory</option>
                    <option>ESG & Sustainability</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/50 block mb-1.5">Message</label>
                  <textarea
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/25 text-sm rounded-lg px-4 py-3 outline-none focus:border-gold-400/50 transition-colors resize-none"
                    placeholder="Briefly describe your needs..."
                  />
                </div>

                <button type="submit" className="btn-gold w-full justify-center py-3.5">
                  Send Inquiry <ArrowRight size={16} />
                </button>

                <p className="text-xs text-white/30 text-center">
                  We respond within 24 hours. Your data is handled securely.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
