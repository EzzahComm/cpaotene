"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Phone,
  ArrowRight,
  Shield,
  BarChart3,
  Scale,
  FileText,
  Globe,
  Leaf,
  Lock,
  Building2,
  Briefcase,
  BookOpen,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { name: "Audit & Assurance", icon: Shield, href: "/services/audit-assurance", desc: "Independent audit and financial assurance" },
  { name: "Tax Advisory", icon: Calculator, href: "/services/tax-advisory", desc: "Tax planning, compliance, and dispute resolution" },
  { name: "Governance Advisory", icon: Scale, href: "/services/governance-advisory", desc: "Board governance and institutional frameworks" },
  { name: "Risk & Compliance", icon: BarChart3, href: "/services/risk-compliance", desc: "Enterprise risk management solutions" },
  { name: "Internal Audit", icon: FileText, href: "/services/internal-audit", desc: "Internal control frameworks and reviews" },
  { name: "IFRS Advisory", icon: Globe, href: "/services/ifrs-advisory", desc: "International financial reporting standards" },
  { name: "ESG & Sustainability", icon: Leaf, href: "/services/esg-sustainability", desc: "Environmental, social, and governance consulting" },
  { name: "Cybersecurity Advisory", icon: Lock, href: "/services/cybersecurity-advisory", desc: "Digital risk and cybersecurity frameworks" },
  { name: "Public Sector Advisory", icon: Building2, href: "/services/public-sector-advisory", desc: "Government and public institutions consulting" },
  { name: "Financial Advisory", icon: Briefcase, href: "/services/financial-advisory", desc: "M&A, restructuring, and valuations" },
  { name: "SME Advisory", icon: BookOpen, href: "/services/sme-advisory", desc: "Growth advisory for SMEs and startups" },
  { name: "Bookkeeping", icon: Calculator, href: "/services/bookkeeping", desc: "Accurate books and financial management" },
];

const industries = [
  { name: "Banking & Financial Services", href: "/industries/banking" },
  { name: "Insurance", href: "/industries/insurance" },
  { name: "Public Sector", href: "/industries/public-sector" },
  { name: "NGOs & Not-for-Profit", href: "/industries/ngo-not-for-profit" },
  { name: "Healthcare & Life Sciences", href: "/industries/healthcare" },
  { name: "Real Estate & Construction", href: "/industries/real-estate" },
  { name: "Energy & Natural Resources", href: "/industries/energy" },
  { name: "Technology & Telecoms", href: "/industries/technology" },
  { name: "Private Equity", href: "/industries/private-equity" },
  { name: "Retail & Consumer", href: "/industries/retail" },
  { name: "Manufacturing", href: "/industries/manufacturing" },
  { name: "Media & Entertainment", href: "/industries/media" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const menuTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const handleMenuEnter = (menu: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block border-b border-orange-600 bg-orange-600 transition-all duration-300">
        <div className="container-enterprise flex justify-between items-center py-2">
          <div className="flex items-center gap-6 text-xs text-white/90">
            <a href="tel:+254747515972" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              +254 747 515 972
            </a>
            <a href="mailto:info@cpaotene.com" className="hover:text-white transition-colors">
              info@cpaotene.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-white/90">
            <Link href="/client-portal" className="hover:text-white transition-colors">Client Portal</Link>
            <span className="text-white/30">|</span>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 bg-orange-500 border-b border-orange-600 shadow-enterprise transition-all duration-300">
        <div className="container-enterprise">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group" aria-label="CPA OTENE & ASSOCIATES LLP — Home">
              <div className={cn(
                "transition-all duration-300 rounded-xl px-3 py-1.5",
                "bg-white/95 shadow-enterprise-md"
              )}>
                <Image
                  src="/logo.png"
                  alt="CPA OTENE & ASSOCIATES LLP"
                  width={246}
                  height={69}
                  className="h-11 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {/* Home */}
              <NavLink href="/" label="Home" />

              {/* About */}
              <NavLink href="/about" label="About Us" />

              {/* Services Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter("services")}
                onMouseLeave={handleMenuLeave}
              >
                <button type="button" className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  "text-white hover:text-white hover:bg-white/15"
                )}>
                  Services
                  <ChevronDown size={14} className={cn(
                    "transition-transform duration-200",
                    activeMenu === "services" ? "rotate-180" : ""
                  )} />
                </button>

                <AnimatePresence>
                  {activeMenu === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white rounded-2xl shadow-enterprise-xl border border-gray-100 overflow-hidden"
                      onMouseEnter={() => handleMenuEnter("services")}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p className="text-xs font-semibold text-gold-500 uppercase tracking-widest">Our Expertise</p>
                            <h3 className="text-lg font-bold text-navy-900 font-heading">Professional Services</h3>
                          </div>
                          <Link
                            href="/services"
                            className="flex items-center gap-1.5 text-sm font-semibold text-royal-500 hover:text-gold-500 transition-colors"
                          >
                            View All <ArrowRight size={14} />
                          </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-navy-50 transition-colors group"
                            >
                              <div className="w-8 h-8 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-navy-900 transition-colors">
                                <service.icon size={14} className="text-navy-700 group-hover:text-gold-400 transition-colors" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-navy-900 leading-tight">{service.name}</p>
                                <p className="text-xs text-charcoal-400 mt-0.5 leading-tight">{service.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="bg-navy-50 px-6 py-4 flex items-center justify-between">
                        <p className="text-xs text-charcoal-500">Trusted by 20+ enterprises across East Africa</p>
                        <Link
                          href="/contact"
                          className="text-xs font-semibold text-navy-900 hover:text-gold-500 flex items-center gap-1 transition-colors"
                        >
                          Book a consultation <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Industries Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => handleMenuEnter("industries")}
                onMouseLeave={handleMenuLeave}
              >
                <button type="button" className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  "text-white hover:text-white hover:bg-white/15"
                )}>
                  Industries
                  <ChevronDown size={14} className={cn(
                    "transition-transform duration-200",
                    activeMenu === "industries" ? "rotate-180" : ""
                  )} />
                </button>

                <AnimatePresence>
                  {activeMenu === "industries" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white rounded-2xl shadow-enterprise-xl border border-gray-100 overflow-hidden"
                      onMouseEnter={() => handleMenuEnter("industries")}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-xs font-semibold text-gold-500 uppercase tracking-widest">Sectors</p>
                            <h3 className="text-base font-bold text-navy-900 font-heading">Industries We Serve</h3>
                          </div>
                          <Link href="/industries" className="text-xs font-semibold text-royal-500 hover:text-gold-500 flex items-center gap-1 transition-colors">
                            All Industries <ArrowRight size={12} />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {industries.map((ind) => (
                            <Link
                              key={ind.name}
                              href={ind.href}
                              className="px-3 py-2 rounded-lg hover:bg-navy-50 text-xs font-medium text-charcoal-700 hover:text-navy-900 transition-colors"
                            >
                              {ind.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink href="/insights" label="Insights" />
              <NavLink href="/#downloads" label="Downloads" />
              <NavLink href="/careers" label="Careers" />
            </nav>

            {/* Right CTAs */}
            <div className="hidden xl:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  "text-white/90 hover:text-white hover:bg-white/15"
                )}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link
                href="/contact"
                className="btn-primary text-sm py-2.5 px-5"
              >
                Talk to an Advisor
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "xl:hidden p-2 rounded-lg transition-all",
                "text-white hover:bg-white/15"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-orange-500 border-t border-orange-600 overflow-y-auto max-h-[85vh]"
            >
              <div className="container-enterprise py-6 space-y-1">
                <MobileNavLink href="/" label="Home" />
                <MobileNavLink href="/about" label="About Us" />

                <MobileSection label="Services" items={services.map(s => ({ name: s.name, href: s.href }))} />
                <MobileSection label="Industries" items={industries} />

                <MobileNavLink href="/insights" label="Insights" />
                <MobileNavLink href="/#downloads" label="Downloads" />
                <MobileNavLink href="/careers" label="Careers" />
                <MobileNavLink href="/contact" label="Contact Us" />

                <div className="pt-4 border-t border-white/20 space-y-3">
                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Talk to an Advisor
                  </Link>
                  <a href="tel:+254747515972" className="flex items-center justify-center gap-2 text-sm text-white/80">
                    <Phone size={14} /> +254 747 515 972
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-900/80 backdrop-blur-sm flex items-start justify-center pt-20"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              className="bg-white rounded-2xl shadow-enterprise-xl w-full max-w-2xl mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <Search size={20} className="text-charcoal-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search services, insights, industries..."
                  className="flex-1 text-base text-navy-900 placeholder:text-charcoal-400 outline-none"
                />
                <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="text-charcoal-400 hover:text-navy-900 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-charcoal-400 font-medium uppercase tracking-wider mb-3">Quick Links</p>
                <div className="space-y-1">
                  {[
                    { label: "Audit & Assurance", href: "/services/audit-assurance" },
                    { label: "Tax Advisory", href: "/services/tax-advisory" },
                    { label: "Governance Advisory", href: "/services/governance-advisory" },
                    { label: "Contact an Advisor", href: "/contact" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-navy-50 text-sm text-charcoal-700 hover:text-navy-900 transition-colors"
                    >
                      <ArrowRight size={14} className="text-gold-500" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = !href.includes("#") && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive
          ? "text-white bg-white/20 font-semibold"
          : "text-white/90 hover:text-white hover:bg-white/15"
      )}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/15 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileSection({
  label,
  items,
}: {
  label: string;
  items: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white/15 transition-colors"
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open ? "rotate-180" : "")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pt-1 pb-2 space-y-0.5">
              {items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-xs text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
