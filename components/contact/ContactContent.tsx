"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";

const offices = [
  {
    city: "Nairobi",
    tag: "Head Office",
    address: "Upper Hill Office Park, Off Ngong Road, Nairobi",
    phone: "+254 700 000 000",
    email: "nairobi@cpaotene.co.ke",
    hours: "Mon–Fri, 8:00 AM – 5:30 PM",
  },
  {
    city: "Nakuru",
    tag: "Regional Office",
    address: "Kenyatta Avenue, Nakuru CBD, Nakuru",
    phone: "+254 700 000 001",
    email: "nakuru@cpaotene.co.ke",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
  },
  {
    city: "Kisumu",
    tag: "Regional Office",
    address: "Oginga Odinga Street, Kisumu CBD, Kisumu",
    phone: "+254 700 000 002",
    email: "kisumu@cpaotene.co.ke",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
  },
  {
    city: "Bungoma",
    tag: "Regional Office",
    address: "Moi Avenue, Bungoma CBD, Bungoma",
    phone: "+254 700 000 003",
    email: "bungoma@cpaotene.co.ke",
    hours: "Mon–Fri, 8:00 AM – 5:00 PM",
  },
];

const services = [
  "Audit & Assurance",
  "Tax Advisory",
  "Governance Advisory",
  "Risk & Compliance",
  "Internal Audit",
  "IFRS Advisory",
  "ESG & Sustainability",
  "Cybersecurity Advisory",
  "Public Sector Advisory",
  "Financial Advisory",
  "SME Advisory",
  "Bookkeeping Services",
  "Other",
];

export function ContactContent() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref}>
      {/* Form + Info */}
      <section className="section-padding bg-white">
        <div className="container-enterprise">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <span className="label-enterprise mb-3 flex items-center gap-2">
                  <span className="w-6 h-px bg-gold-400" /> Get In Touch
                </span>
                <h2 className="text-display-sm font-bold font-heading text-navy-900 mb-4">
                  We're here to help
                </h2>
                <p className="text-charcoal-600 leading-relaxed">
                  Whether you need immediate advisory or want to explore a long-term
                  partnership, our team is ready. Fill in the form and we'll connect
                  you with the right advisor within 24 hours.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-3">
                {[
                  { icon: Phone, title: "Call Us", value: "+254 700 000 000", href: "tel:+254700000000", sub: "Mon–Fri, 8:00 AM – 5:30 PM" },
                  { icon: Mail, title: "Email Us", value: "info@cpaotene.co.ke", href: "mailto:info@cpaotene.co.ke", sub: "We respond within 24 hours" },
                  { icon: MessageCircle, title: "WhatsApp", value: "Chat with us", href: `https://wa.me/254700000000`, sub: "Quick response on WhatsApp" },
                ].map(({ icon: Icon, title, value, href, sub }) => (
                  <a
                    key={title}
                    href={href}
                    target={href.startsWith("https") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold-200 hover:bg-gold-50/50 transition-all group"
                  >
                    <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-navy-900 transition-colors">
                      <Icon size={18} className="text-navy-700 group-hover:text-gold-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-charcoal-400">{title}</p>
                      <p className="text-sm font-semibold text-navy-900">{value}</p>
                      <p className="text-xs text-charcoal-400 mt-0.5">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business hours */}
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-gold-500" />
                  <h4 className="text-sm font-semibold text-navy-900">Business Hours</h4>
                </div>
                <div className="space-y-1 text-xs text-charcoal-500">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium text-navy-900">8:00 AM – 5:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-navy-900">9:00 AM – 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday & Public Holidays</span>
                    <span className="font-medium text-charcoal-400">Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="card-enterprise p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-navy-900 mb-2">
                      Message Received
                    </h3>
                    <p className="text-charcoal-500 text-sm">
                      Thank you for reaching out. A member of our advisory team will
                      contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold font-heading text-navy-900 mb-1">Send us a message</h3>
                    <p className="text-sm text-charcoal-500 mb-6">All fields marked * are required.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-charcoal-700 block mb-1.5">First Name *</label>
                          <input name="firstName" required type="text" placeholder="James" className="w-full border border-gray-200 text-charcoal-800 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Last Name *</label>
                          <input name="lastName" required type="text" placeholder="Ochieng" className="w-full border border-gray-200 text-charcoal-800 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Email Address *</label>
                          <input name="email" required type="email" placeholder="james@org.co.ke" className="w-full border border-gray-200 text-charcoal-800 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Phone Number</label>
                          <input name="phone" type="tel" placeholder="+254 700 000 000" className="w-full border border-gray-200 text-charcoal-800 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all" />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Organisation / Company *</label>
                        <input name="organisation" required type="text" placeholder="Your organisation name" className="w-full border border-gray-200 text-charcoal-800 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all" />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-charcoal-700 block mb-1.5">Service Required *</label>
                        <select name="service" required className="w-full border border-gray-200 text-charcoal-700 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all bg-white">
                          <option value="">Select a service...</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-charcoal-700 block mb-1.5">How Can We Help? *</label>
                        <textarea name="message" required rows={4} placeholder="Briefly describe your needs or the challenge you're looking to address..." className="w-full border border-gray-200 text-charcoal-800 text-sm rounded-lg px-4 py-3 outline-none focus:border-royal-400 focus:ring-1 focus:ring-royal-100 transition-all resize-none" />
                      </div>

                      <div className="flex items-start gap-2.5">
                        <input type="checkbox" required id="consent" className="mt-1 accent-navy-900" />
                        <label htmlFor="consent" className="text-xs text-charcoal-500">
                          I agree to CPA Otene and Associates LLP processing my data for the purpose of responding to my inquiry. View our{" "}
                          <a href="/privacy" className="text-royal-500 hover:underline">Privacy Policy</a>.
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending..." : (
                          <>
                            Send Message <Send size={15} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="section-padding bg-gray-50" id="offices">
        <div className="container-enterprise">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <span className="label-enterprise mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" /> Our Offices
            </span>
            <h2 className="text-display-sm font-bold font-heading text-navy-900">
              Find us across Kenya
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="card-enterprise p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold font-heading text-navy-900">{office.city}</h3>
                  <span className="text-xs bg-gold-50 text-gold-700 px-2.5 py-1 rounded-full font-medium border border-gold-100">
                    {office.tag}
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin size={13} className="text-gold-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-charcoal-500">{office.address}</p>
                  </div>
                  <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-xs text-charcoal-500 hover:text-navy-900 transition-colors">
                    <Phone size={12} className="text-gold-500" /> {office.phone}
                  </a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-xs text-charcoal-500 hover:text-navy-900 transition-colors">
                    <Mail size={12} className="text-gold-500" /> {office.email}
                  </a>
                  <div className="flex items-center gap-2 text-xs text-charcoal-400">
                    <Clock size={12} className="text-gold-500" /> {office.hours}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
