"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

export default function TaskNewPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setLoading(true);

    const response = await fetch("/api/client-portal/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        priority,
        dueDate: dueDate || null,
      }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setFeedback(result.error || "Failed to create task.");
      return;
    }

    setFeedback("Task created successfully.");
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Task</h1>
            <p className="mt-2 text-gray-600">Add a new action item for your CPA engagement.</p>
          </div>
          <Link href="/client-portal/tasks">
            <Button variant="outline">Back to tasks</Button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Task Title</label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="mt-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-2"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
              <select
                id="priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {feedback && <p className="text-sm text-slate-600">{feedback}</p>}

          <div className="flex justify-end gap-3">
            <Link href="/client-portal/tasks">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Create Task"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
