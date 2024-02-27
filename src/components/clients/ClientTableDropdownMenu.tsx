"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { generateClient } from "@/actions/client";

export default function ClientTableDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Developer Mode</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await generateClient({})}>
          Create a new client
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
