import SidebarNavItem from "./sidebar-nav-item";
import {
  Activity,
  AreaChart,
  Atom,
  ChevronsUpDown,
  Clock,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[300px] bg-sidebar border-[#363636] border-r p-2 min-h-full flex flex-col gap-4",
        className
      )}
    >
      <div className="flex flex-col gap-2">
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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="border border-border/20 flex p-1 items-center justify-between text-primary-foreground rounded-sm my-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Ella Barnett</p>
              </div>
              <div>
                <ChevronsUpDown />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <nav className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              MAIN
            </h3>
            <SidebarNavItem href="/app" exact>
              <LayoutDashboard />
              Dashboard
            </SidebarNavItem>
            {/* <SidebarNavItem href="/app/analytics" exact>
              <AreaChart />
              Analytics
            </SidebarNavItem> */}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              CLIENTS
            </h3>
            <SidebarNavItem href="/app/clients" exact>
              <Handshake />
              Active Clients
            </SidebarNavItem>
            <SidebarNavItem href="/app/clients/history">
              <History />
              Client History
            </SidebarNavItem>
            <SidebarNavItem href="/app/clients/all">
              <Users />
              All Clients
            </SidebarNavItem>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-xs text-muted-foreground font-semibold pl-2">
              INVENTORY
            </h3>
            <li>
              <SidebarNavItem href="/app/vehicles">
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
              <SidebarNavItem href="/app/team">
                <Shield />
                Team
              </SidebarNavItem>
              {/* <SidebarNavItem href="/app/performance">
                <Activity />
                Performance
              </SidebarNavItem> */}
            </li>
          </div>
        </nav>
      </div>
    </div>
  );
}
