import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Invoices - CPA OTENE",
  description: "View your invoices and payment status.",
};

export default async function ClientPortalInvoicesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: clientData } = await supabase
    .from("clients")
    .select("id, organization_name")
    .eq("user_id", user.id)
    .single();

  if (!clientData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Client not found</h1>
          <p className="mt-4 text-gray-600">We couldn't find your client account. Please contact support.</p>
        </div>
      </div>
    );
  }

  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, invoice_number, issue_date, due_date, status, currency, amount_due, amount_paid, description, external_url")
    .eq("client_id", clientData.id)
    .order("issue_date", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
            <p className="mt-2 text-gray-600">Review issued invoices, payment progress, and due dates.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/client-portal/invoices/new">
              <Button>Create Invoice</Button>
            </Link>
            <Link href="/client-portal">
              <Button variant="outline">Back to portal</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Payment Summary</h2>
            <p className="mt-2 text-gray-600">Track unpaid and overdue amounts directly from the portal.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Billing Support</h2>
            <p className="mt-2 text-gray-600">If you have questions about an invoice, contact your CPA Otene advisor.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Download Invoices</h2>
            <p className="mt-2 text-gray-600">Open invoice links for printable receipts and records.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="border-b px-6 py-4 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900">Your Invoice History</h2>
          </div>
          <div className="p-6">
            {invoices && invoices.length > 0 ? (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{invoice.invoice_number}</p>
                        <p className="mt-1 text-sm text-slate-600">{invoice.description || "No description provided."}</p>
                      </div>
                      <div className="text-sm text-slate-500">
                        {invoice.currency} {invoice.amount_paid?.toFixed(2)} paid
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Issued</p>
                        <p className="mt-1 text-sm text-slate-900">{invoice.issue_date}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Due</p>
                        <p className="mt-1 text-sm text-slate-900">{invoice.due_date || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{invoice.status}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="space-y-2 text-sm text-slate-600">
                        <div>Amount due: {invoice.currency} {invoice.amount_due?.toFixed(2)}</div>
                        <div>Status: <span className="font-semibold text-slate-900">{invoice.status}</span></div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        {invoice.external_url ? (
                          <a
                            href={invoice.external_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline"
                          >
                            View invoice
                          </a>
                        ) : (
                          <span className="text-slate-500">No external link</span>
                        )}
                        <Link href={`/client-portal/invoices/${invoice.id}`}>
                          <Button variant="outline">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
                <p>No invoices have been issued yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
