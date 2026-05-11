import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Client Portal - CPA OTENE",
  description: "Manage your files, invoices, and services",
};

export default async function ClientPortalPage() {
  const supabase = await createClient();

  // Get current session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Get client info
  const { data: clientData } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Portal</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.email}</p>
          </div>
          <form
            action="/auth/logout"
            method="POST"
            className="flex items-center gap-4"
          >
            <Button type="submit" variant="outline">
              Logout
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Client Information Card */}
        {clientData && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Organization Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Organization Name</p>
                <p className="text-lg font-medium">{clientData.organization_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Industry</p>
                <p className="text-lg font-medium capitalize">{clientData.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">KRA PIN</p>
                <p className="text-lg font-medium">{clientData.kra_pin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Employees</p>
                <p className="text-lg font-medium">{clientData.employees}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Documents
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Submit files for your ongoing services.
            </p>
            <Link href="/client-portal/documents">
              <Button className="w-full">Go to Documents</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View Invoices
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Track your billing and payments.
            </p>
            <Link href="/client-portal/invoices">
              <Button className="w-full">Go to Invoices</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Tasks
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Review project tasks and deadlines.
            </p>
            <Link href="/client-portal/tasks">
              <Button className="w-full">Go to Tasks</Button>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Request Service
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Submit new service requests.
            </p>
            <Link href="/services">
              <Button className="w-full">Browse Services</Button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-8 text-gray-600">
            <p>No recent activity</p>
          </div>
        </div>
      </main>
    </div>
  );
}
