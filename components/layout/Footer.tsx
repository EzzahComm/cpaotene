"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Linkedin, Twitter, Facebook,
  ArrowRight, Shield, ChevronRight
} from "lucide-react";

const services = [
  { name: "Audit & Assurance", href: "/services/audit-assurance" },
  { name: "Tax Advisory", href: "/services/tax-advisory" },
  { name: "Governance Advisory", href: "/services/governance-advisory" },
  { name: "Risk & Compliance", href: "/services/risk-compliance" },
  { name: "Internal Audit", href: "/services/internal-audit" },
  { name: "IFRS Advisory", href: "/services/ifrs-advisory" },
  { name: "ESG & Sustainability", href: "/services/esg-sustainability" },
  { name: "Cybersecurity Advisory", href: "/services/cybersecurity-advisory" },
  { name: "Public Sector Advisory", href: "/services/public-sector-advisory" },
  { name: "Financial Advisory", href: "/services/financial-advisory" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Our Leadership", href: "/about#leadership" },
  { name: "Our Values", href: "/about#values" },
  { name: "Careers", href: "/careers" },
  { name: "Insights", href: "/insights" },
  { name: "Contact Us", href: "/contact" },
];

const offices = [
  { city: "Nairobi", address: "Upper Hill, Nairobi, Kenya" },
  { city: "Nakuru", address: "Nakuru CBD, Nakuru, Kenya" },
  { city: "Kisumu", address: "Kisumu CBD, Kisumu, Kenya" },
  { city: "Bungoma", address: "Bungoma CBD, Bungoma, Kenya" },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-royal-500 to-navy-800 border-b border-white/10">
        <div className="container-enterprise py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-heading text-white mb-2">
                Ready to elevate your governance?
              </h3>
              <p className="text-white/70 text-sm">
                Connect with our advisors and discover how we can support your organisation's growth.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="btn-gold text-sm py-3 px-6"
              >
                Book a Consultation
              </Link>
              <Link
                href="/services"
                className="btn-ghost-white text-sm py-3 px-6"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-enterprise py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-royal-500 to-navy-700 rounded-lg flex items-center justify-center border border-white/10">
                <span className="text-gold-400 font-bold text-sm font-heading">CPA</span>
              </div>
              <div>
                <div className="font-bold text-sm text-white font-heading">CPA OTENE</div>
                <div className="text-xs text-white/50">& Associates LLP</div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Kenya's trusted audit, governance, tax, risk, and advisory firm.
              Delivering excellence across East Africa with international standards
              and local expertise.
            </p>

            {/* Certifications */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <Shield size={14} className="text-gold-400" />
                <span className="text-xs text-white/70 font-medium">ICPAK Registered</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <Shield size={14} className="text-gold-400" />
                <span className="text-xs text-white/70 font-medium">ACCA Affiliate</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-400/30 transition-all duration-200"
                >
                  <Icon size={15} className="text-white/60 hover:text-gold-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-xs text-white/55 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight size={10} className="text-gold-500/0 group-hover:text-gold-500 transition-colors" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.name}>
                  <Link
                    href={c.href}
                    className="text-xs text-white/55 hover:text-white flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight size={10} className="text-gold-500/0 group-hover:text-gold-500 transition-colors" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Offices */}
          <div>
            <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-widest mb-5">Our Offices</h4>
            <ul className="space-y-4 mb-6">
              {offices.map((o) => (
                <li key={o.city} className="flex items-start gap-2">
                  <MapPin size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-white/80">{o.city}</p>
                    <p className="text-xs text-white/45">{o.address}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-2.5">
              <a href="tel:+254700000000" className="flex items-center gap-2 text-xs text-white/55 hover:text-white transition-colors">
                <Phone size={12} className="text-gold-400" />
                +254 700 000 000
              </a>
              <a href="mailto:info@cpaotene.co.ke" className="flex items-center gap-2 text-xs text-white/55 hover:text-white transition-colors">
                <Mail size={12} className="text-gold-400" />
                info@cpaotene.co.ke
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Bar */}
      <div className="border-t border-white/5">
        <div className="container-enterprise py-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Stay ahead with our insights</p>
              <p className="text-xs text-white/50">Governance, tax, audit, and regulatory updates for East African leaders.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-60 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-gold-400/50 transition-colors"
              />
              <button type="submit" className="btn-gold text-sm py-2.5 px-4 flex-shrink-0">
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-enterprise py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} CPA Otene and Associates LLP. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Sitemap", href: "/sitemap.xml" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/35 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
