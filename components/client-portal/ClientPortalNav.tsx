"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Receipt, CheckSquare,
  LogOut, ChevronLeft, ChevronRight, Shield, ExternalLink
} from "lucide-react";

const navItems = [
  { href: "/client-portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/client-portal/documents", label: "Documents", icon: FileText, exact: false },
  { href: "/client-portal/invoices", label: "Invoices", icon: Receipt, exact: false },
  { href: "/client-portal/tasks", label: "Tasks", icon: CheckSquare, exact: false },
];

interface ClientPortalNavProps {
  userEmail: string;
}

export function ClientPortalNav({ userEmail }: ClientPortalNavProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside
      className={`flex flex-col bg-navy-900 border-r border-navy-800 transition-all duration-200 flex-shrink-0 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-navy-800">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-royal-500 to-navy-700 rounded-lg flex items-center justify-center border border-white/10 flex-shrink-0">
              <span className="text-gold-400 font-bold text-xs font-heading">CPA</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white font-heading leading-tight">CPA OTENE</p>
              <p className="text-[10px] text-white/40 leading-tight">Client Portal</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="w-8 h-8 bg-gradient-to-br from-royal-500 to-navy-700 rounded-lg flex items-center justify-center border border-white/10 mx-auto">
            <span className="text-gold-400 font-bold text-xs font-heading">CPA</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-6 h-6 bg-navy-800 border border-navy-700 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-navy-700 transition-colors flex-shrink-0 ${collapsed ? "mx-auto mt-2" : ""}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-hidden">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                active
                  ? "bg-gold-500/15 border border-gold-400/20 text-gold-400"
                  : "text-white/55 hover:text-white hover:bg-white/5"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium font-heading truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-navy-800 p-3 space-y-2">
        {/* Website Link */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all group"
          title={collapsed ? "Back to website" : undefined}
        >
          <ExternalLink size={16} className="flex-shrink-0" />
          {!collapsed && <span className="text-xs truncate">Back to Website</span>}
        </Link>

        {/* User + Logout */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-800/60 border border-navy-700 ${collapsed ? "justify-center" : ""}`}>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Shield size={10} className="text-gold-400 flex-shrink-0" />
                <p className="text-[10px] text-gold-400 font-medium truncate">Secure Session</p>
              </div>
              <p className="text-xs text-white/50 truncate">{userEmail}</p>
            </div>
          )}
          <form action="/auth/logout" method="POST">
            <button
              type="submit"
              className="w-8 h-8 bg-navy-700 border border-navy-600 rounded-lg flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-500/30 transition-all flex-shrink-0"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
