import { Sidebar } from "@/components/layout/sidebar";
import SessionManager from "@/components/ui/sessionmanager";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SessionManager/>
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
    </div>
  );
}