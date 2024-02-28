"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { z } from "zod";
import { Prisma, RoleEnum } from "@prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import {
  loginSchema,
  registerSchema,
  signToken,
  verifyToken,
} from "@/lib/auth";

export async function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUsers() {
  return prisma.user.findMany();
}

const userSelect = {
  id: true,
  name: true,
  role: true,
  profileImage: true,
} satisfies Prisma.UserSelect;

export async function register(unparsedData: z.infer<typeof registerSchema>) {
  const { email, password, accessCode, name } = await registerSchema.parseAsync(
    unparsedData
  );
  const doesUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (doesUserExist) return { error: "User already exists" };
  if (accessCode !== process.env.REGISTER_CODE) {
    return { error: "Invalid access code" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: "USER",
    },
  });
  const token = await signToken({ role: "USER", userId: user.id });
  console.log(token);
  cookies().set("token", token);
  redirect("/");
}

export async function login(unparsedData: z.infer<typeof loginSchema>) {
  const { email, password } = await loginSchema.parseAsync(unparsedData);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return { error: "User not found" };
  try {
    if (await bcrypt.compare(password, user.hashedPassword)) {
      const token = await signToken({ role: user.role, userId: user.id });
      cookies().set("token", token);
      redirect("/");
    }
  } catch (error) {
    return { error: "Invalid password" };
  }
}

export async function signOut() {
  cookies().delete("token");
  redirect("/auth");
}

async function getToken() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;
    const payload = verifyToken(token);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSelfUser() {
  const token = await getToken();
  if (!token) return null;
  const user = await prisma.user.findUnique({
    where: { id: token.userId },
    select: userSelect,
  });
  return user;
}
