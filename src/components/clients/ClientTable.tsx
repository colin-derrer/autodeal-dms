import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ClientTableRow from "./ClientTableRow";
import { Client } from "@prisma/client";

type ClientTableProps = {
  className?: string;
  clients: Client[];
};

export default function ClientTable({ clients, className }: ClientTableProps) {
  return (
    <Table className={cn(className)}>
      <TableCaption>Assigned clients</TableCaption>
      <TableHeader className="">
        <TableRow className="text-xs text-muted-foreground font-medium ">
          <TableHead className="max-w-[400px] ">Client</TableHead>
          <TableHead>Phase</TableHead>
          <TableHead>Interested vehicles</TableHead>
          <TableHead>Events</TableHead>
          <TableHead className="text-right">
            Last accessed and contacted
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <ClientTableRow key={client.id} client={client} />
        ))}
      </TableBody>
    </Table>
  );
}

function ClientEventsCell({ events }: { events: string[] }) {
  return (
    <TableCell>
      <ul>
        {events.map((event) => (
          <li key={event}>{event}</li>
        ))}
      </ul>
    </TableCell>
  );
}
