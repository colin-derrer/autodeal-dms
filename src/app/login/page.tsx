import { prisma } from "@/lib/prisma";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      profileImage: true,
      email: true,
    },
  });
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-navbar flex justify-between items-center px-4 py-1">
        <p className="text-[10px] font-medium text-muted-foreground">
          ALPHA - VERSION 1.0.0
        </p>
      </div>
      <div className="grow flex">
        <div className="w-1/2 h-full bg-primary"></div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center">
          <LoginForm users={users} />
        </div>
      </div>
    </div>
  );
}
