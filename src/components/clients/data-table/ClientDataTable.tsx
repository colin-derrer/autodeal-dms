"use client";

import { ClientWithVehicle } from "@/app/app/clients/layout";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type ClientDataTableProps = {
  clients: ClientWithVehicle[];
};

export const columns: ColumnDef<ClientWithVehicle>[] = [
  {
    accessorKey: "name",
    header: "Client",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return (
        <Link href={`/app/clients/cat`} className="flex flex-col">
          <p className="font-medium text-base">{name as string}</p>
          <p className="text-sm font-medium text-muted-foreground">
            {"Unknown"}
          </p>
        </Link>
      );
    },
  },
  {
    accessorKey: "clientPhase",
    header: "Phase",
  },
  {
    accessorKey: "interestedVehicles",
    header: "Interested vehicles",
    cell: ({ row }) => {
      const firstVehicle = row.getValue(
        "interestedVehicles"
      ) as ClientWithVehicle["interestedVehicles"];
      return <div className="font-medium">{firstVehicle[0]?.make || "-"}</div>;
    },
  },
  {
    accessorKey: "clientEvents",
    header: "Events",
    cell: ({ row }) => {
      const events = row.getValue(
        "clientEvents"
      ) as ClientWithVehicle["clientEvents"];
      return <div className="font-medium">{events[0] || "-"}</div>;
    },
  },
  {
    accessorKey: "lastAccessed",
    header: () => <div className="text-right">Last accessed and contacted</div>,
    cell: ({ row }) => {
      const lastAccessed = row.getValue(
        "lastAccessed"
      ) as ClientWithVehicle["lastAccessed"];
      const assignedDate = row.getValue(
        "assignedDate"
      ) as ClientWithVehicle["assignedDate"];
      return (
        <div className="flex flex-col justify-end text-right">
          <p className="font-medium text-base">
            {lastAccessed?.toDateString() || "never"}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {assignedDate?.toDateString() || "never"}
          </p>
        </div>
      );
    },
  },
];

export default function ClientDataTable({ clients }: ClientDataTableProps) {
  return (
    <div className="pt-2">
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
