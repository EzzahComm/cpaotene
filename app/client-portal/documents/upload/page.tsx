"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const documentTypes = [
  { value: "invoice", label: "Invoice" },
  { value: "receipt", label: "Receipt" },
  { value: "statement", label: "Statement" },
  { value: "tax_return", label: "Tax Return" },
  { value: "other", label: "Other" },
];

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("invoice");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setStatus("Please choose a file first.");
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("description", description);
    formData.append("file", file);

    const response = await fetch("/api/client-portal/documents", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(result.error || "Upload failed. Please try again.");
      return;
    }

    setStatus("Document uploaded successfully.");
    setFile(null);
    setDescription("");
    setDocumentType("invoice");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Document</h1>
            <p className="mt-2 text-gray-600">Add a new file to your client portal record.</p>
          </div>
          <Link href="/client-portal/documents">
            <Button variant="outline">Back to documents</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-slate-700">
              Document Type
            </label>
            <select
              id="documentType"
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Give us a quick note about this document"
              className="mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">File</label>
            <Input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="mt-2"
            />
          </div>

          {status && <p className="text-sm text-slate-600">{status}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Uploading…" : "Upload Document"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
