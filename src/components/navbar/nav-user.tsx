import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type NavUserTypes = {
  user: {
    avatarSrc?: string;
    name: string;
    email: string;
    role: string;
    dealershipName: string;
  };
};
export default function NavUser({ user }: NavUserTypes) {
  const imgSrc = user.avatarSrc || "https://github.com/shadcn.png";
  return (
    <div className="flex items-center gap-2 w-full h-12">
      <Avatar>
        <AvatarImage src={imgSrc} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          {user.role} - {user.dealershipName}
        </span>
        <span className="font-medium">{user.name}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {user.email}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto" asChild>
          <Button variant={"outline"} size="icon" className="">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
