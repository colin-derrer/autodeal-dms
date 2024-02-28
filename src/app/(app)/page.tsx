import ClientTable from "@/components/clients/ClientTable";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const clients = await prisma.client.findMany();
  const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col grow">
      <div className="h-24 border-b p-4 bg-sidebar text-primary-foreground">
        <h1 className="text-2xl font-medium ">Dashboard</h1>
      </div>
      <main className="p-4 flex gap-4 flex-col">
        <div className="flex gap-4">
          <Card className="w-1/4 flex flex-col p-2 gap-2">
            <p className="text-xs text-muted-foreground font-medium">Clients</p>
            <h2 className="text-3xl font-medium">{clients.length}</h2>
            <p className="text-sm text-muted-foreground font-medium">
              +0% from last month
            </p>
          </Card>
          <Card className="w-1/4 flex flex-col p-2 gap-2">
            <p className="text-xs text-muted-foreground font-medium">Users</p>
            <h2 className="text-3xl font-medium">{users.length}</h2>
            <p className="text-sm text-muted-foreground font-medium">
              +0% from last month
            </p>
          </Card>
          <Card className="w-1/4 flex flex-col p-2 gap-2">
            <p className="text-xs text-muted-foreground font-medium">Clients</p>
            <h2 className="text-3xl font-medium">1500</h2>
            <p className="text-sm text-muted-foreground font-medium">
              +10% from last month
            </p>
          </Card>
          <Card className="w-1/4 flex flex-col p-2 gap-2">
            <p className="text-xs text-muted-foreground font-medium">Clients</p>
            <h2 className="text-3xl font-medium">1500</h2>
            <p className="text-sm text-muted-foreground font-medium">
              +10% from last month
            </p>
          </Card>
        </div>
        <div className="flex gap-4 h-[450px]">
          <Card className="grow p-2 relative flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              Gross sales volume
            </p>
            <Tabs
              defaultValue="1week"
              className="m-2 absolute top-0 right-0 shadow"
            >
              <TabsList className="">
                <TabsTrigger value="1week">1 week</TabsTrigger>
                <TabsTrigger value="1month">1 month</TabsTrigger>
                <TabsTrigger value="6months">6 months</TabsTrigger>
                <TabsTrigger value="1year">1 year</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="bg-muted p-2 border grow rounded-md">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <p>Placeholder for a chart.</p>
                <p className="text-sm text-muted-foreground">
                  Will use VisX or Recharts
                </p>
              </div>
            </div>
          </Card>
          <Card className="w-96 p-2 flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              Recent events
            </p>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <p>Placeholder for recent events.</p>
              <p className="text-sm text-muted-foreground">
                Will have websocket functionality
              </p>
            </div>
          </Card>
        </div>
        <ClientTable clients={clients} />
      </main>
    </div>
  );
}
