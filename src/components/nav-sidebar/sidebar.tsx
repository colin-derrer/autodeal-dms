import SidebarNavItem from "./sidebar-nav-item";
import {
  ChevronsUpDown,
  Handshake,
  History,
  LayoutDashboard,
  Orbit,
  Shield,
  Table2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import SidebarNavUser from "./sidebar-nav-user";
import { getSelfUser } from "@/actions/users";

export default async function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  const currentUser = await getSelfUser();
  return (
    <div
      className={cn(
        "w-[300px] bg-sidebar border-[#363636] border-r p-2 min-h-full flex flex-col gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div>
            <Orbit className="size-10 text-primary-foreground" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-muted-foreground">
              Dealership Management Software
            </p>
            <h2 className="text-lg font-bold text-primary-foreground">
              Halcyon DMS
            </h2>
          </div>
        </div>
        <Separator className="bg-primary-foreground/20" />
        <SidebarNavUser username={currentUser?.name || "Unknown name"} />
        <nav className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              MAIN
            </h3>
            <SidebarNavItem href="/" exact>
              <LayoutDashboard />
              Dashboard
            </SidebarNavItem>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              CLIENTS
            </h3>
            <SidebarNavItem href="/clients" exact>
              <Handshake />
              Active Clients
            </SidebarNavItem>
            <SidebarNavItem href="/clients/history">
              <History />
              Client History
            </SidebarNavItem>
            <SidebarNavItem href="/clients/all">
              <Users />
              All Clients
            </SidebarNavItem>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              INVENTORY
            </h3>
            <li>
              <SidebarNavItem href="/vehicles">
                <Table2 />
                Vehicle Database
              </SidebarNavItem>
            </li>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              OPERATIONS
            </h3>
            <li>
              <SidebarNavItem href="/team">
                <Shield />
                Team
              </SidebarNavItem>
            </li>
          </div>
        </nav>
      </div>
    </div>
  );
}
