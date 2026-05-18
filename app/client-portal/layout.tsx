import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ClientPortalNav } from "@/components/client-portal/ClientPortalNav";

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ClientPortalNav userEmail={user.email ?? ""} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
