"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
];

export default function InvoiceEditForm({ invoice }: any) {
  const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoice_number || "");
  const [issueDate, setIssueDate] = useState(invoice.issue_date || new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(invoice.due_date || "");
  const [status, setStatus] = useState(invoice.status || "draft");
  const [currency, setCurrency] = useState(invoice.currency || "KES");
  const [amountDue, setAmountDue] = useState(String(invoice.amount_due ?? ""));
  const [amountPaid, setAmountPaid] = useState(String(invoice.amount_paid ?? ""));
  const [description, setDescription] = useState(invoice.description || "");
  const [externalUrl, setExternalUrl] = useState(invoice.external_url || "");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setLoading(true);

    const response = await fetch(`/api/client-portal/invoices/${invoice.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceNumber,
        issueDate,
        dueDate: dueDate || null,
        status,
        currency,
        amountDue: parseFloat(amountDue) || 0,
        amountPaid: parseFloat(amountPaid) || 0,
        description,
        externalUrl,
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFeedback(result.error || "Failed to update invoice.");
      return;
    }

    setFeedback("Invoice updated successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Invoice</h1>
            <p className="mt-2 text-gray-600">Update invoice details and billing status.</p>
          </div>
          <Link href="/client-portal/invoices">
            <Button variant="outline">Back to invoices</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="invoiceNumber" className="block text-sm font-medium text-slate-700">Invoice Number</label>
              <Input id="invoiceNumber" value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} required className="mt-2" />
            </div>
            <div>
              <label htmlFor="issueDate" className="block text-sm font-medium text-slate-700">Issue Date</label>
              <Input id="issueDate" type="date" value={issueDate} onChange={(event) => setIssueDate(event.target.value)} required className="mt-2" />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="mt-2" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
              <select id="status" value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-slate-700">Currency</label>
              <Input id="currency" value={currency} onChange={(event) => setCurrency(event.target.value)} required className="mt-2" />
            </div>
            <div>
              <label htmlFor="amountDue" className="block text-sm font-medium text-slate-700">Amount Due</label>
              <Input id="amountDue" type="number" value={amountDue} onChange={(event) => setAmountDue(event.target.value)} className="mt-2" min="0" step="0.01" />
            </div>
            <div>
              <label htmlFor="amountPaid" className="block text-sm font-medium text-slate-700">Amount Paid</label>
              <Input id="amountPaid" type="number" value={amountPaid} onChange={(event) => setAmountPaid(event.target.value)} className="mt-2" min="0" step="0.01" />
            </div>
            <div>
              <label htmlFor="externalUrl" className="block text-sm font-medium text-slate-700">External Invoice Link</label>
              <Input id="externalUrl" type="url" value={externalUrl} onChange={(event) => setExternalUrl(event.target.value)} className="mt-2" placeholder="https://..." />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <Textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} className="mt-2" />
          </div>

          {feedback && <p className="text-sm text-slate-600">{feedback}</p>}

          <div className="flex justify-end gap-3">
            <Link href="/client-portal/invoices">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Update Invoice"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
