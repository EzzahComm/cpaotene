import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import InvoiceEditForm from "./InvoiceEditForm";

export default async function InvoiceEditPage({ params }: { params: { invoiceId: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  const { data: invoice } = await supabase
    .from("invoices")
    .select("id, invoice_number, issue_date, due_date, status, currency, amount_due, amount_paid, description, external_url")
    .eq("id", params.invoiceId)
    .single();

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900">Invoice not found</h1>
          <p className="mt-4 text-gray-600">The invoice you are trying to edit does not exist or is not accessible.</p>
        </div>
      </div>
    );
  }

  return <InvoiceEditForm invoice={invoice} />;
}
