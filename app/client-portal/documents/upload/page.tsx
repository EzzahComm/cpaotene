"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, FileText, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

const DOCUMENT_TYPES = [
  { value: "invoice",    label: "Invoice" },
  { value: "receipt",    label: "Receipt" },
  { value: "statement",  label: "Bank Statement" },
  { value: "tax_return", label: "Tax Return" },
  { value: "other",      label: "Other" },
];

export default function DocumentUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("invoice");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) { setStatus({ type: "error", message: "Please select a file first." }); return; }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("description", description);
    formData.append("file", file);

    const res = await fetch("/api/client-portal/documents", { method: "POST", body: formData });
    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      setStatus({ type: "error", message: result.error || "Upload failed. Please try again." });
      return;
    }

    setStatus({ type: "success", message: "Document uploaded successfully." });
    setTimeout(() => router.push("/client-portal/documents"), 1500);
  }

  return (
    <main className="flex-1 overflow-auto">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="flex items-center gap-4">
          <Link
            href="/client-portal/documents"
            className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft size={14} /> Documents
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-bold font-heading text-navy-900">Upload Document</h1>
        </div>
      </div>

      <div className="px-8 py-8 max-w-2xl">
        <div className="card-enterprise p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center">
              <Upload size={18} className="text-navy-700" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-navy-900">Upload a Document</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Share files securely with your advisory team.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Document type */}
            <div>
              <label htmlFor="documentType" className="text-xs font-medium text-charcoal-500 block mb-1.5">Document Type</label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                aria-label="Document type"
                className="w-full bg-white border border-gray-200 text-navy-900 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all"
              >
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-medium text-charcoal-500 block mb-1.5">Description <span className="text-charcoal-300">(optional)</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief note about this document…"
                rows={3}
                className="w-full bg-white border border-gray-200 text-navy-900 placeholder:text-charcoal-300 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all resize-none"
              />
            </div>

            {/* File picker */}
            <div>
              <label className="text-xs font-medium text-charcoal-500 block mb-1.5">File</label>
              <label className="flex items-center gap-3 w-full border-2 border-dashed border-gray-200 hover:border-gold-300 rounded-xl px-4 py-5 cursor-pointer transition-all group">
                <div className="w-9 h-9 bg-gray-100 group-hover:bg-gold-50 rounded-xl flex items-center justify-center transition-colors">
                  <FileText size={16} className="text-charcoal-400 group-hover:text-gold-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  {file ? (
                    <p className="text-sm font-medium text-navy-900 truncate">{file.name}</p>
                  ) : (
                    <p className="text-sm text-charcoal-400">Click to choose a file</p>
                  )}
                  <p className="text-xs text-charcoal-300 mt-0.5">PDF, XLSX, DOCX, PNG, JPG — max 20 MB</p>
                </div>
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf,.xlsx,.xls,.docx,.doc,.png,.jpg,.jpeg,.csv"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            {/* Status */}
            {status && (
              <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-green-50 border border-green-100 text-green-700"
                  : "bg-red-50 border border-red-100 text-red-600"
              }`}>
                {status.type === "success"
                  ? <CheckCircle2 size={15} />
                  : <AlertCircle size={15} />
                }
                {status.message}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/client-portal/documents" className="btn-outline text-sm py-2.5 px-5">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading || !file}
                className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading…" : (
                  <><Upload size={14} /> Upload Document</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
