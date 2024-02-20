import NavItem from "./nav-item";
import {
  Archive,
  AreaChart,
  Cog,
  Handshake,
  Landmark,
  LayoutDashboard,
  Orbit,
  SatelliteDish,
  Shield,
  Table2,
  Users,
} from "lucide-react";
import NavUser from "./nav-user";
import { getToken, getUser } from "@/actions/request";

export default async function Navbar() {
  const token = await getToken();
  const user = token ? await getUser(token.id) : null;
  
  return (
    <nav className="w-[300px] max-w-[300px] overflow-clip border-r p-2 h-screen flex flex-col gap-4">
      <div className="py-4 flex items-center border-b max-h-12">
        <Orbit className="size-8" />
        <span className="text-2xl font-bold">Auto</span>
        <span className="text-2xl font-light">Dash</span>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-muted-foreground font-semibold pl-2">
            MAIN
          </h3>
          <NavItem href="/" exact>
            <LayoutDashboard />
            Dashboard
          </NavItem>
          <NavItem href="/analytics">
            <AreaChart />
            Analytics
          </NavItem>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-muted-foreground font-semibold pl-2">
            CLIENTS
          </h3>
          <NavItem href="/clients/active">
            <Handshake />
            Active Clients
          </NavItem>
          <NavItem href="/clients/leads">
            <SatelliteDish />
            Leads
          </NavItem>
          <NavItem href="/clients/all">
            <Users />
            All Clients
          </NavItem>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-muted-foreground font-semibold pl-2">
            INVENTORY
          </h3>

          <li>
            <NavItem href="/vehicles">
              <Table2 />
              Vehicle Database
            </NavItem>
          </li>
          <li>
            <NavItem href="/records">
              <Archive />
              Records
            </NavItem>
          </li>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-muted-foreground font-semibold pl-2">
            OPERATIONS
          </h3>

          <li>
            <NavItem href="/org/dealerships">
              <Cog />
              Dealerships
            </NavItem>
          </li>
          <li>
            <NavItem href="/org/teams">
              <Shield />
              Teams
            </NavItem>
          </li>
          <li>
            <NavItem href="/org/organization">
              <Landmark />
              Organization
            </NavItem>
          </li>
        </div>
      </div>
      <div className="py-4 flex items-center border-t mt-auto">
        <NavUser user={{ name: "Shad", email: "shadcn@cn.com" }} />
      </div>
    </nav>
  );
}
