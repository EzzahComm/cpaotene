import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Tasks - CPA OTENE",
  description: "Track tasks and project milestones for your client account.",
};

export default async function ClientPortalTasksPage() {
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

  const { data: tasks } = await supabase
    .from("client_tasks")
    .select("id, title, description, status, priority, due_date, created_at, updated_at")
    .eq("client_id", clientData.id)
    .order("due_date", { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Tasks</h1>
            <p className="mt-2 text-gray-600">View action items, deadlines, and task status for your engagement.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/client-portal/tasks/new">
              <Button>Create Task</Button>
            </Link>
            <Link href="/client-portal">
              <Button variant="outline">Back to portal</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Open Tasks</h2>
            <p className="mt-2 text-gray-600">Tasks are updated by your CPA Otene team to keep you on track.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Deadline Alerts</h2>
            <p className="mt-2 text-gray-600">Stay informed about upcoming due dates and priority items.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Collaboration</h2>
            <p className="mt-2 text-gray-600">Use this dashboard to keep all engagement tasks visible and organized.</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="border-b px-6 py-4 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900">Your Task Board</h2>
          </div>
          <div className="p-6">
            {tasks && tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-slate-900">{task.title}</p>
                        <p className="mt-2 text-sm text-slate-600">{task.description || "No additional details provided."}</p>
                      </div>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p>
                          <span className="font-medium text-slate-900">Priority:</span> {task.priority}
                        </p>
                        <p>
                          <span className="font-medium text-slate-900">Status:</span> {task.status}
                        </p>
                        <p>
                          <span className="font-medium text-slate-900">Due:</span> {task.due_date || "TBD"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-500">
                      Updated: {task.updated_at ? new Date(task.updated_at).toLocaleDateString() : new Date(task.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
                <p>No tasks are currently assigned to your account.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
