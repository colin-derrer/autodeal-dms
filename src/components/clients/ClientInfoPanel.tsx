import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Client } from "@prisma/client";
import ModifyClientDialog from "./ModifyClientDialog";

type ClientInfoPanelProps = {
  client: Client;
  className?: string;
};

export default function ClientInfoPanel({
  client,
  className,
}: ClientInfoPanelProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground font-medium">
            Last accessed {client.lastAccessed?.toDateString() || "never"}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ModifyClientDialog client={client} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle>{client.name}</CardTitle>
        <CardDescription>Added due to {client.lead}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-xs text-muted-foreground capitalize font-medium">
            Contact Information
          </p>
          <p className="text-sm">Address: 125 Example Address, WA 65432</p>
          <p className="text-sm">Phone Number: 925-555-4000</p>
        </div>
      </CardContent>
    </Card>
  );
}
