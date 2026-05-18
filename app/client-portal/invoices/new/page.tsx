import Link from "next/link";
import { ArrowLeft, Receipt } from "lucide-react";

export const metadata = {
  title: "New Invoice — CPA Otene Client Portal",
};

export default function InvoiceNewPage() {
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
          <h1 className="text-lg font-bold font-heading text-navy-900">New Invoice</h1>
        </div>
      </div>

      <div className="px-8 py-8 max-w-xl">
        <div className="card-enterprise p-8 text-center">
          <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Receipt size={20} className="text-navy-700" />
          </div>
          <h2 className="text-base font-bold font-heading text-navy-900 mb-2">Invoices are issued by your advisor</h2>
          <p className="text-sm text-charcoal-500 mb-6">
            Invoices are generated and managed by the CPA Otene team on your behalf.
            To request an invoice or query a billing matter, contact your advisor directly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/client-portal/invoices" className="btn-outline text-sm py-2.5 px-5">
              Back to Invoices
            </Link>
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">
              Contact Advisor
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
