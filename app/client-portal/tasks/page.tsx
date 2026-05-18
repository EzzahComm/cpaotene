import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CheckSquare, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Tasks — CPA Otene Client Portal",
  description: "Review project milestones and deadlines.",
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckSquare }> = {
  open:        { label: "Open",        color: "bg-blue-50 text-blue-700",   icon: CheckSquare },
  in_progress: { label: "In Progress", color: "bg-amber-50 text-amber-700", icon: Clock },
  completed:   { label: "Completed",   color: "bg-green-50 text-green-700", icon: CheckCircle2 },
  blocked:     { label: "Blocked",     color: "bg-red-50 text-red-700",     icon: AlertTriangle },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  low:      { label: "Low",      color: "text-gray-400" },
  medium:   { label: "Medium",   color: "text-blue-500" },
  high:     { label: "High",     color: "text-amber-500" },
  critical: { label: "Critical", color: "text-red-500" },
};

export default async function ClientPortalTasksPage() {
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

  const { data: tasks } = await supabase
    .from("client_tasks")
    .select("id, title, description, status, priority, due_date, created_at, updated_at")
    .eq("client_id", clientData.id)
    .order("due_date", { ascending: true, nullsFirst: false });

  const openCount = tasks?.filter(t => t.status === "open").length ?? 0;
  const inProgressCount = tasks?.filter(t => t.status === "in_progress").length ?? 0;
  const completedCount = tasks?.filter(t => t.status === "completed").length ?? 0;

  return (
    <main className="flex-1 overflow-auto">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-900">Tasks</h1>
          <p className="text-sm text-charcoal-500 mt-0.5">Project milestones and action items from your engagement team.</p>
        </div>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-5xl">
        {/* Summary row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-enterprise p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                <CheckSquare size={16} className="text-blue-600" />
              </div>
              <p className="text-xs font-medium text-charcoal-400">Open</p>
            </div>
            <p className="text-2xl font-bold font-heading text-navy-900">{openCount}</p>
          </div>
          <div className="card-enterprise p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                <Clock size={16} className="text-amber-600" />
              </div>
              <p className="text-xs font-medium text-charcoal-400">In Progress</p>
            </div>
            <p className="text-2xl font-bold font-heading text-navy-900">{inProgressCount}</p>
          </div>
          <div className="card-enterprise p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-600" />
              </div>
              <p className="text-xs font-medium text-charcoal-400">Completed</p>
            </div>
            <p className="text-2xl font-bold font-heading text-navy-900">{completedCount}</p>
          </div>
        </div>

        {/* Task list */}
        <div className="card-enterprise overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 bg-gray-50">
            <h2 className="text-sm font-semibold font-heading text-navy-900">
              Task Board
              {tasks && tasks.length > 0 && (
                <span className="ml-2 text-charcoal-400 font-normal">({tasks.length})</span>
              )}
            </h2>
          </div>

          <div className="p-6">
            {tasks && tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map((task) => {
                  const statusCfg = STATUS_CONFIG[task.status] ?? STATUS_CONFIG.open;
                  const priorityCfg = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.medium;
                  const StatusIcon = statusCfg.icon;
                  const isOverdue = task.due_date && task.status !== "completed" && new Date(task.due_date) < new Date();

                  return (
                    <div key={task.id} className="rounded-xl border border-gray-100 px-5 py-4 hover:border-gray-200 hover:bg-gray-50 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${statusCfg.color.replace("text-", "bg-").replace("-700", "-100").replace("-600", "-100")}`}>
                            <StatusIcon size={14} className={statusCfg.color.split(" ")[1]} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-navy-900">{task.title}</p>
                            {task.description && (
                              <p className="text-xs text-charcoal-500 mt-0.5 leading-relaxed">{task.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.color}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs pl-10">
                        <span className={`font-medium ${priorityCfg.color}`}>
                          ● {priorityCfg.label}
                        </span>
                        {task.due_date && (
                          <span className={isOverdue ? "text-red-500 font-medium" : "text-charcoal-400"}>
                            {isOverdue ? "Overdue · " : "Due: "}
                            {new Date(task.due_date).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                        <span className="text-charcoal-300">
                          Updated {new Date(task.updated_at ?? task.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-200 py-14 text-center">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckSquare size={18} className="text-charcoal-400" />
                </div>
                <p className="text-sm font-medium text-navy-900">No tasks yet</p>
                <p className="text-xs text-charcoal-400 mt-1">Your CPA Otene team will post tasks and milestones here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
