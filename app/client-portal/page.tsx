import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Receipt, CheckSquare, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react";

export const metadata = {
  title: "Dashboard — CPA Otene Client Portal",
  description: "Manage your documents, invoices, and service tasks.",
};

export default async function ClientPortalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: clientData } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Fetch counts for dashboard stats
  const [docsResult, invoicesResult, tasksResult] = await Promise.all([
    supabase.from("documents").select("id", { count: "exact", head: true }).eq("client_id", clientData?.id ?? ""),
    supabase.from("invoices").select("id", { count: "exact", head: true }).eq("client_id", clientData?.id ?? ""),
    supabase.from("client_tasks").select("id", { count: "exact", head: true }).eq("client_id", clientData?.id ?? ""),
  ]);

  const quickActions = [
    {
      href: "/client-portal/documents",
      icon: FileText,
      label: "Documents",
      description: "Submit and manage files for your services",
      count: docsResult.count ?? 0,
      countLabel: "files uploaded",
      color: "bg-blue-50 text-blue-600",
    },
    {
      href: "/client-portal/invoices",
      icon: Receipt,
      label: "Invoices",
      description: "Track your billing and payment history",
      count: invoicesResult.count ?? 0,
      countLabel: "invoices",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      href: "/client-portal/tasks",
      icon: CheckSquare,
      label: "Tasks",
      description: "Review project milestones and deadlines",
      count: tasksResult.count ?? 0,
      countLabel: "active tasks",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">Dashboard</h1>
            <p className="text-sm text-charcoal-500 mt-0.5">
              Welcome back{clientData?.organization_name ? `, ${clientData.organization_name}` : ""}.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-navy-50 border border-navy-100 rounded-xl px-4 py-2">
            <Shield size={14} className="text-navy-600" />
            <span className="text-xs font-medium text-navy-700">Secure Portal</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8 max-w-5xl">
        {/* Client Info */}
        {clientData && (
          <div className="card-enterprise p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-navy-900 rounded-xl flex items-center justify-center">
                <span className="text-gold-400 font-bold text-xs font-heading">
                  {clientData.organization_name?.[0] || "C"}
                </span>
              </div>
              <div>
                <h2 className="text-base font-bold font-heading text-navy-900">
                  {clientData.organization_name}
                </h2>
                <p className="text-xs text-charcoal-500 capitalize">{clientData.industry}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "KRA PIN", value: clientData.kra_pin || "—" },
                { label: "Employees", value: clientData.employees || "—" },
                { label: "Industry", value: clientData.industry || "—" },
                { label: "Status", value: "Active Client" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-charcoal-400">{label}</p>
                  <p className="text-sm font-semibold text-navy-900 mt-0.5 capitalize">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold font-heading text-charcoal-400 uppercase tracking-wider mb-4">
            Your Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="card-enterprise p-6 flex flex-col group hover:border-gold-200 transition-all"
              >
                <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon size={20} />
                </div>
                <h3 className="text-base font-bold font-heading text-navy-900 mb-1 group-hover:text-royal-500 transition-colors">
                  {action.label}
                </h3>
                <p className="text-xs text-charcoal-500 mb-4 flex-1">{action.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal-400">
                    <span className="font-semibold text-navy-900">{action.count}</span> {action.countLabel}
                  </span>
                  <ArrowRight size={14} className="text-royal-500 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-enterprise p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold-50 rounded-xl flex items-center justify-center">
                <TrendingUp size={16} className="text-gold-600" />
              </div>
              <h3 className="text-sm font-bold font-heading text-navy-900">Request a Service</h3>
            </div>
            <p className="text-xs text-charcoal-500 mb-4">
              Need additional advisory support? Browse our full service offering and submit a new engagement request.
            </p>
            <Link href="/services" className="btn-primary text-xs py-2 px-4">
              Browse Services <ArrowRight size={13} />
            </Link>
          </div>

          <div className="card-enterprise p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-navy-50 rounded-xl flex items-center justify-center">
                <Clock size={16} className="text-navy-700" />
              </div>
              <h3 className="text-sm font-bold font-heading text-navy-900">Contact Your Advisor</h3>
            </div>
            <p className="text-xs text-charcoal-500 mb-4">
              Have a question about an ongoing engagement? Reach your dedicated CPA Otene advisor directly.
            </p>
            <Link href="/contact" className="btn-outline text-xs py-2 px-4">
              Get in Touch <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
