import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Client Documents - CPA OTENE",
  description: "View and manage your client documents.",
};

export default async function ClientPortalDocumentsPage() {
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

  const { data: documents } = await supabase
    .from("documents")
    .select("id, file_name, file_type, file_size_kb, document_type, description, storage_url, is_public, created_at")
    .eq("client_id", clientData.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="mt-2 text-gray-600">Manage files you have submitted for your CPA Otene services.</p>
          </div>
          <Link href="/client-portal">
            <Button variant="outline">Back to portal</Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
            <p className="mt-2 text-gray-600">Share files for tax, audit, or advisory work.</p>
            <Link href="/client-portal/documents/upload">
              <Button className="mt-4 w-full">Upload a document</Button>
            </Link>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Document Types</h2>
            <p className="mt-2 text-gray-600">Supported documents include invoices, receipts, statements, and tax returns.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Secure Storage</h2>
            <p className="mt-2 text-gray-600">Your files are stored securely and accessible only to your CPA Otene team.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="border-b px-6 py-4 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900">Uploaded Documents</h2>
          </div>
          <div className="p-6">
            {documents && documents.length > 0 ? (
              <div className="space-y-4">
                {documents.map((document) => (
                  <div key={document.id} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{document.file_name}</p>
                        <p className="mt-1 text-sm text-slate-600">{document.document_type.replace(/_/g, " ")}</p>
                      </div>
                      <div className="text-sm text-slate-500">
                        {document.file_type.toUpperCase()} • {document.file_size_kb ?? "—"} KB
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <p className="text-sm text-slate-600">{document.description || "No description provided."}</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs uppercase tracking-wide">
                          {new Date(document.created_at).toLocaleDateString()}
                        </span>
                        <a
                          href={document.storage_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          Open file
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
                <p>No documents uploaded yet.</p>
                <Link href="/client-portal/documents/upload">
                  <Button className="mt-4">Upload your first document</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
