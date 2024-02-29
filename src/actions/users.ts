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

type REGISTER_RESPONSES = "success" | "email_taken" | "access_code_invalid";

export async function register(
  unparsedData: z.infer<typeof registerSchema>
): Promise<REGISTER_RESPONSES> {
  const { email, password, accessCode, name } = await registerSchema.parseAsync(
    unparsedData
  );
  const doesUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (doesUserExist) return "email_taken";
  if (accessCode !== process.env.REGISTER_CODE) {
    return "access_code_invalid";
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
  cookies().set("token", token);
  return "success";
}

type LOGIN_RESPONSES = "success" | "user_not_found" | "invalid_password";

export async function login(
  unparsedData: z.infer<typeof loginSchema>
): Promise<LOGIN_RESPONSES> {
  const loginData = await loginSchema.parseAsync(unparsedData);
  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });
  if (!user) return "user_not_found";
  try {
    if (await bcrypt.compare(loginData.password, user.hashedPassword)) {
      const token = await signToken({ role: user.role, userId: user.id });
      cookies().set("token", token);
      return "success";
    }
    return "invalid_password";
  } catch (error) {
    console.error(error);
    return "invalid_password";
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
