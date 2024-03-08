import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { prisma } from "@/lib/prisma";
import DevSelectUser from "./DevSelectUser";

export const dynamic = "force-dynamic";

export default async function AuthPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profileImage: true,
    },
  });
  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full bg-primary"></div>
      <div className="w-1/2 h-full flex flex-col items-center ">
        <Tabs defaultValue="login" className="w-[400px] pt-24">
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <DevSelectUser users={users} />
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
