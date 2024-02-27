"use client";

import { generateUser, setUser } from "@/actions/dev";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <Button variant={"outline"}>DEV</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={handleGenerateUser}
        >
          Generate user w/ password "password"
        </Button>
        {users.map((user) => (
          <DropdownMenuItem
            key={user.id}
            className="flex gap-2 items-center"
            onClick={() => setUser(user.id)}
          >
            <img
              src={user.profileImage || "https://github.com/shadcn.png"}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p>{user.name}</p>
              <p className="text-muted-foreground text-xs">
                {user.role} - {user.email}
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
