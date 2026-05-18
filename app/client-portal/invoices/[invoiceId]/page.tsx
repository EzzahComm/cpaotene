import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Receipt } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  draft:     { label: "Draft",     color: "bg-gray-100 text-gray-600" },
  sent:      { label: "Sent",      color: "bg-blue-50 text-blue-700" },
  paid:      { label: "Paid",      color: "bg-green-50 text-green-700" },
  overdue:   { label: "Overdue",   color: "bg-red-50 text-red-700" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-500" },
};

export default async function InvoiceDetailPage({ params }: { params: Promise<{ invoiceId: string }> }) {
  const { invoiceId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: invoice } = await supabase
    .from("invoices")
    .select("id, invoice_number, issue_date, due_date, status, currency, amount_due, amount_paid, total, notes")
    .eq("id", invoiceId)
    .single();

  if (!invoice) {
    return (
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-20 text-center">
          <h1 className="text-2xl font-bold font-heading text-navy-900">Invoice not found</h1>
          <p className="text-charcoal-500 mt-2 text-sm">This invoice doesn't exist or you don't have access.</p>
          <Link href="/client-portal/invoices" className="btn-outline text-sm py-2 px-4 mt-6 inline-flex">
            Back to Invoices
          </Link>
        </div>
      </main>
    );
  }

  const statusCfg = STATUS_CONFIG[invoice.status] ?? STATUS_CONFIG.draft;

  return (
    <main className="flex-1 overflow-auto">
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="flex items-center gap-4">
          <Link
            href="/client-portal/invoices"
            className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft size={14} /> Invoices
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-bold font-heading text-navy-900">{invoice.invoice_number}</h1>
        </div>
      </div>

      <div className="px-8 py-8 max-w-2xl">
        <div className="card-enterprise p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center">
                <Receipt size={18} className="text-navy-700" />
              </div>
              <div>
                <h2 className="text-base font-bold font-heading text-navy-900">{invoice.invoice_number}</h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.color}`}>
                  {statusCfg.label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold font-heading text-navy-900">
                {invoice.currency} {(invoice.total ?? invoice.amount_due ?? 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            {[
              { label: "Issue Date", value: invoice.issue_date },
              { label: "Due Date",   value: invoice.due_date || "—" },
              { label: "Amount Due", value: `${invoice.currency} ${(invoice.amount_due ?? 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}` },
              { label: "Amount Paid", value: `${invoice.currency} ${(invoice.amount_paid ?? 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-charcoal-400">{label}</p>
                <p className="text-sm font-semibold text-navy-900 mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          {invoice.notes && (
            <div className="mt-4 bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-charcoal-400 mb-1">Notes</p>
              <p className="text-sm text-charcoal-600">{invoice.notes}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-charcoal-400 mb-3">Have a question about this invoice?</p>
            <Link href="/contact" className="btn-outline text-sm py-2.5 px-5">
              Contact Your Advisor
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
