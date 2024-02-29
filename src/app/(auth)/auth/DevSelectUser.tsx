"use client";

import { generateUser, setUser } from "@/actions/dev";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Menu, MoreHorizontal } from "lucide-react";
import { useTransition } from "react";

type DevSelectUserProps = {
  users: {
    id: string;
    name: string;
    email: string;
    role: string;
    profileImage: string | null;
  }[];
};

export default function DevSelectUser({ users }: DevSelectUserProps) {
  const [isPending, startTransition] = useTransition();

  function handleGenerateUserClick() {
    startTransition(async () => {
      const { userId } = await generateUser();
      await setUser(userId);
    });
  }

  function handleUserClick(userId: string) {
    startTransition(() => {
      setUser(userId);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 space-y-2">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleGenerateUserClick}
          disabled={isPending}
        >
          {isPending ? "Generating user..." : "Generate user"}
        </Button>
        <div className="flex flex-col gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={
                "flex rounded-md gap-2 items-center hover:bg-muted group p-1 transition-colors duration-200" +
                (isPending ? " opacity-50 cursor-wait" : " cursor-pointer")
              }
              onClick={() => handleUserClick(user.id)}
            >
              <Avatar>
                <AvatarFallback className="bg-muted text-muted-foreground group-hover:bg-primary/10">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p>{user.name}</p>
                <p className="text-muted-foreground text-xs">{user.role}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
