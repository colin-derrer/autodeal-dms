"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function setUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) return null;
  const token = jwt.sign(
    { role: user.role, user_id: user.id } satisfies jwt.JwtPayload,
    process.env.JWT_SECRET
  );
  cookies().set("token", token);
  redirect("/app");
}

export async function generateUser() {
  const name = faker.person.firstName();
  const data = {
    name,
    email: faker.internet.email({ firstName: name }),
    hashedPassword: await bcrypt.hash("password", 10),
    role: "SALES",
  } satisfies Prisma.UserCreateInput;
  const user = await prisma.user.create({ data });
  return { userId: user.id, name: user.name };
}
