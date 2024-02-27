import ClientInfoPanel from "@/components/clients/ClientInfoPanel";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

type ClientsPageId = {
  params: {
    clientId: string;
  };
};

export default async function ClientsPageId({ params }: ClientsPageId) {
  const client = await prisma.client.findUnique({
    where: {
      id: params.clientId,
    },
  });

  if (!client) {
    return (
      <Card>
        <CardContent className="flex justify-center align-middle p-4">
          <p>Client with ID {params.clientId} was not found.</p>
        </CardContent>
      </Card>
    );
  }

  return <ClientInfoPanel client={client} />;
}
