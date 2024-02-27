import DashboardSidebar from "@/components/nav-sidebar/sidebar";

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex">
      <DashboardSidebar />
      {children}
    </div>
  );
}
