"use client";

import { TableRow, TableCell } from "../ui/table";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";

type ClientTableRowProps = {
  client: Client;
};

export default function ClientTableRow({ client }: ClientTableRowProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/clients/${client.id}`);
  return (
    <TableRow
      className={cn("cursor-pointer", isActive && "bg-primary/5")}
      onClick={() => router.push(`/clients/${client.id}`)}
    >
      <TableCell className="flex flex-col">
        <p className="font-medium text-base">{client.name}</p>
        <p className="text-sm font-medium text-muted-foreground">
          {client.lead}
        </p>
      </TableCell>
      <TableCell>
        <Badge>{client.clientPhase}</Badge>
      </TableCell>
      <TableCell>{"-"}</TableCell>
      <TableCell>{client.clientEvents[0] ?? "-"}</TableCell>
      <TableCell className="flex flex-col justify-end text-right">
        <p className="font-medium text-base">
          {client.lastAccessed?.toDateString() || "never"}
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          {client.assignedDate?.toDateString() || "never"}
        </p>
      </TableCell>
    </TableRow>
  );
}
