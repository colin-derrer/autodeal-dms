import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ClientTable from "@/components/clients/ClientTable";
import ClientInfoPanel from "@/components/clients/ClientInfoPanel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ClientsPage() {
  return (
    <Card>
      <CardContent className="flex justify-center align-middle p-4">
        <p>Select a client</p>
      </CardContent>
    </Card>
  );
}
