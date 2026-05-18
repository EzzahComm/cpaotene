import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Receipt, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Invoices — CPA Otene Client Portal",
  description: "Review your billing and payment history.",
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  draft:     { label: "Draft",    color: "bg-gray-100 text-gray-600" },
  sent:      { label: "Sent",     color: "bg-blue-50 text-blue-700" },
  paid:      { label: "Paid",     color: "bg-green-50 text-green-700" },
  overdue:   { label: "Overdue",  color: "bg-red-50 text-red-700" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-500" },
};

export default async function ClientPortalInvoicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: clientData } = await supabase
    .from("clients")
    .select("id, organization_name")
    .eq("user_id", user.id)
    .single();

  if (!clientData) {
    return (
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-20 text-center">
          <h1 className="text-2xl font-bold font-heading text-navy-900">No client profile found</h1>
          <p className="text-charcoal-500 mt-2 text-sm">Contact your CPA Otene advisor to link your account.</p>
        </div>
      </main>
    );
  }

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, issue_date, due_date, status, currency, amount_due, amount_paid, notes, total")
    .eq("client_id", clientData.id)
    .order("issue_date", { ascending: false });

  const totalPaid = invoices?.filter(i => i.status === "paid").reduce((s, i) => s + (i.amount_paid ?? 0), 0) ?? 0;
  const totalDue = invoices?.filter(i => i.status !== "paid" && i.status !== "cancelled").reduce((s, i) => s + (i.amount_due ?? 0), 0) ?? 0;
  const overdueCount = invoices?.filter(i => i.status === "overdue").length ?? 0;

  return (
    <main className="flex-1 overflow-auto">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">Invoices</h1>
          <p className="text-sm text-charcoal-500 mt-0.5">Track your billing and payment history.</p>
        </div>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-5xl">
        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-enterprise p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-600" />
              </div>
              <p className="text-xs font-medium text-charcoal-400">Total Paid</p>
            </div>
            <p className="text-xl font-bold font-heading text-navy-900">
              KES {totalPaid.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="card-enterprise p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                <Clock size={16} className="text-blue-600" />
              </div>
              <p className="text-xs font-medium text-charcoal-400">Outstanding</p>
            </div>
            <p className="text-xl font-bold font-heading text-navy-900">
              KES {totalDue.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="card-enterprise p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertCircle size={16} className="text-red-600" />
              </div>
              <p className="text-xs font-medium text-charcoal-400">Overdue</p>
            </div>
            <p className="text-xl font-bold font-heading text-navy-900">{overdueCount} invoice{overdueCount !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Invoice list */}
        <div className="card-enterprise overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 bg-gray-50">
            <h2 className="text-sm font-semibold font-heading text-navy-900">
              Invoice History
              {invoices && invoices.length > 0 && (
                <span className="ml-2 text-charcoal-400 font-normal">({invoices.length})</span>
              )}
            </h2>
          </div>

          <div className="p-6">
            {invoices && invoices.length > 0 ? (
              <div className="space-y-3">
                {invoices.map((invoice) => {
                  const statusCfg = STATUS_CONFIG[invoice.status] ?? STATUS_CONFIG.draft;
                  return (
                    <div key={invoice.id} className="rounded-xl border border-gray-100 px-5 py-4 hover:border-gray-200 hover:bg-gray-50 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Receipt size={16} className="text-navy-700" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-navy-900">{invoice.invoice_number}</p>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.color}`}>
                                {statusCfg.label}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal-400 mt-0.5">{invoice.notes || "No description"}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold font-heading text-navy-900">
                            {invoice.currency} {(invoice.total ?? invoice.amount_due ?? 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-xs text-charcoal-400 mt-0.5">
                            {invoice.amount_paid > 0
                              ? `${invoice.currency} ${invoice.amount_paid.toLocaleString("en-KE", { minimumFractionDigits: 2 })} paid`
                              : "Unpaid"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-charcoal-400 pl-13">
                        <span>Issued: {invoice.issue_date}</span>
                        {invoice.due_date && <span>Due: {invoice.due_date}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 py-14 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Receipt size={18} className="text-charcoal-400" />
                </div>
                <p className="text-sm font-medium text-navy-900">No invoices yet</p>
                <p className="text-xs text-charcoal-400 mt-1">Invoices issued by CPA Otene will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
