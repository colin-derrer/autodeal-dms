"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function setUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return null;
  const token = await signToken({ role: user.role, userId: user.id });
  cookies().set("token", token);
  return redirect("/");
}

export async function generateUser() {
  const name = faker.person.firstName();
  const data = {
    name,
    email: faker.internet.email({ firstName: name }),
    hashedPassword: await bcrypt.hash("password", 10),
    role: "USER",
  } satisfies Prisma.UserCreateInput;
  const user = await prisma.user.create({ data });
  revalidatePath("/");
  return { userId: user.id, name: user.name };
}
