import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Upload, Lock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Documents — CPA Otene Client Portal",
  description: "Submit and manage files for your CPA Otene services.",
};

const DOC_TYPE_LABELS: Record<string, string> = {
  invoice: "Invoice",
  receipt: "Receipt",
  statement: "Bank Statement",
  tax_return: "Tax Return",
  other: "Other",
};

export default async function ClientPortalDocumentsPage() {
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

  const { data: documents } = await supabase
    .from("documents")
    .select("id, file_name, file_type, file_size_kb, document_type, description, storage_url, created_at")
    .eq("client_id", clientData.id)
    .order("created_at", { ascending: false });

  return (
    <main className="flex-1 overflow-auto">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-900">Documents</h1>
            <p className="text-sm text-charcoal-500 mt-0.5">Submit and manage files for your services.</p>
          </div>
          <Link
            href="/client-portal/documents/upload"
            className="btn-primary text-sm py-2.5 px-5"
          >
            <Upload size={14} /> Upload Document
          </Link>
        </div>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-5xl">
        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Upload, label: "Upload Files", desc: "Share documents for tax, audit, or advisory work.", color: "bg-blue-50 text-blue-600" },
            { icon: FileText, label: "Supported Types", desc: "Invoices, receipts, bank statements, and tax returns.", color: "bg-purple-50 text-purple-600" },
            { icon: Lock, label: "Secure Storage", desc: "Files are encrypted and accessible only to your team.", color: "bg-emerald-50 text-emerald-600" },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="card-enterprise p-5">
              <div className={`w-8 h-8 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={16} />
              </div>
              <h3 className="text-sm font-bold font-heading text-navy-900 mb-1">{label}</h3>
              <p className="text-xs text-charcoal-500">{desc}</p>
            </div>
          ))}
        </div>

        {/* Documents list */}
        <div className="card-enterprise overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 bg-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold font-heading text-navy-900">
              Uploaded Documents
              {documents && documents.length > 0 && (
                <span className="ml-2 text-charcoal-400 font-normal">({documents.length})</span>
              )}
            </h2>
          </div>

          <div className="p-6">
            {documents && documents.length > 0 ? (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-5 py-4 hover:border-gray-200 hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-9 h-9 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText size={16} className="text-navy-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy-900 truncate">{doc.file_name}</p>
                        <p className="text-xs text-charcoal-400 mt-0.5">
                          {DOC_TYPE_LABELS[doc.document_type] ?? doc.document_type}
                          {doc.file_size_kb ? ` · ${doc.file_size_kb} KB` : ""}
                          {" · "}{new Date(doc.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <a
                      href={doc.storage_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-royal-500 hover:text-gold-500 transition-colors flex-shrink-0"
                    >
                      Open <ArrowRight size={12} />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 py-14 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText size={18} className="text-charcoal-400" />
                </div>
                <p className="text-sm font-medium text-navy-900">No documents yet</p>
                <p className="text-xs text-charcoal-400 mt-1 mb-4">Upload your first file to get started.</p>
                <Link href="/client-portal/documents/upload" className="btn-primary text-xs py-2 px-4">
                  <Upload size={13} /> Upload Document
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
