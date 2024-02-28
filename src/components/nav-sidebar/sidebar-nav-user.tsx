"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import { signOut } from "@/actions/authActions";

export default function SidebarNavUser({ username }: { username: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border border-border/20 flex p-1 items-center justify-between text-primary-foreground rounded-sm">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-muted text-muted-foreground">
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{username || "Unknown name"}</p>
          </div>
          <div>
            <ChevronsUpDown />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>History</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
