"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckSquare, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

const PRIORITIES = [
  { value: "low",      label: "Low" },
  { value: "medium",   label: "Medium" },
  { value: "high",     label: "High" },
  { value: "critical", label: "Critical" },
];

export default function TaskNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await fetch("/api/client-portal/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, priority, dueDate: dueDate || null }),
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      setStatus({ type: "error", message: result.error || "Failed to create task." });
      return;
    }

    setStatus({ type: "success", message: "Task created successfully." });
    setTimeout(() => router.push("/client-portal/tasks"), 1500);
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="flex items-center gap-4">
          <Link
            href="/client-portal/tasks"
            className="flex items-center gap-1.5 text-sm text-charcoal-400 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft size={14} /> Tasks
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-lg font-bold font-heading text-navy-900">New Task</h1>
        </div>
      </div>

      <div className="px-8 py-8 max-w-2xl">
        <div className="card-enterprise p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center">
              <CheckSquare size={18} className="text-navy-700" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading text-navy-900">Create a Task</h2>
              <p className="text-xs text-charcoal-500 mt-0.5">Flag an action item for your advisory team.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="text-xs font-medium text-charcoal-500 block mb-1.5">Task Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Provide Q3 bank statements"
                className="w-full bg-white border border-gray-200 text-navy-900 placeholder:text-charcoal-300 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all"
              />
            </div>

            <div>
              <label htmlFor="taskDesc" className="text-xs font-medium text-charcoal-500 block mb-1.5">
                Description <span className="text-charcoal-300">(optional)</span>
              </label>
              <textarea
                id="taskDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Add any context your advisor needs…"
                className="w-full bg-white border border-gray-200 text-navy-900 placeholder:text-charcoal-300 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="text-xs font-medium text-charcoal-500 block mb-1.5">Priority</label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  aria-label="Task priority"
                  className="w-full bg-white border border-gray-200 text-navy-900 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dueDate" className="text-xs font-medium text-charcoal-500 block mb-1.5">
                  Due Date <span className="text-charcoal-300">(optional)</span>
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 text-navy-900 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/10 transition-all"
                />
              </div>
            </div>

            {status && (
              <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                status.type === "success"
                  ? "bg-green-50 border border-green-100 text-green-700"
                  : "bg-red-50 border border-red-100 text-red-600"
              }`}>
                {status.type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                {status.message}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/client-portal/tasks" className="btn-outline text-sm py-2.5 px-5">Cancel</Link>
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="btn-primary text-sm py-2.5 px-5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Saving…" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
