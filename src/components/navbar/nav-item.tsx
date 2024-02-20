"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  exact?: boolean;
};

//Thanks to https://www.danstroot.com/snippets/nextjs-navlink-component for showing me how to use this!
export default function NavItem({
  href,
  children,
  className,
  exact,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(`${href}`);
  return (
    <Link
      href={href}
      className={cn(
        "text-sm flex gap-1 items-center px-2 py-1 font-medium  rounded-md hover:bg-primary/90 hover:text-primary-foreground transition-colors duration-200 ease-in-out",
        isActive ? "bg-primary text-primary-foreground" : "bg-transparent",
        className
      )}
    >
      {children}
    </Link>
  );
}
