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
  async function handleGenerateUser() {
    const { userId } = await generateUser();
    await setUser(userId);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleGenerateUser}
        >
          Generate user
        </Button>
        {users.map((user) => (
          <DropdownMenuItem
            key={user.id}
            className="flex gap-2 items-center"
            onClick={() => setUser(user.id)}
          >
            <Avatar>
              <AvatarFallback className="bg-muted text-muted-foreground">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.role}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
