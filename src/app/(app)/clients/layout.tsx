import { Input } from "@/components/ui/input";
import ClientTable from "@/components/clients/ClientTable";
import ClientTableDropdownMenu from "@/components/clients/ClientTableDropdownMenu";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type ClientWithVehicle = Prisma.ClientGetPayload<{
  include: {
    interestedVehicles: {
      select: { vinId: true; make: true; model: true; year: true };
    };
  };
}>;

export default async function ClientsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const clients = (await prisma.client.findMany({
    include: {
      interestedVehicles: {
        select: { vinId: true, make: true, model: true, year: true },
      },
    },
  })) satisfies ClientWithVehicle[];

  return (
    <div className="flex flex-col grow">
      <div className="h-24 bg-sidebar p-4">
        <h1 className="text-2xl text-primary-foreground font-medium">
          Clients
        </h1>
      </div>
      <div className="flex p-2 justify-between gap-2">
        <div className="p-2 grow max-w-[1200px]">
          <div className="flex justify-between">
            <Input
              className="max-w-72"
              type="search"
              placeholder="Search for a client"
            />
            <ClientTableDropdownMenu />
          </div>
          <ClientTable clients={clients} />
        </div>
        <div className="p-2 grow">{children}</div>
      </div>
    </div>
  );
}
