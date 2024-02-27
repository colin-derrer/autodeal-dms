"use server";

import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Prisma, RoleEnum } from "@prisma/client";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const userSelect = {
  id: true,
  name: true,
  role: true,
  profileImage: true,
} satisfies Prisma.UserSelect;

const loginSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

export async function login(unparsedData: z.infer<typeof loginSchema>) {
  const { email, password } = await loginSchema.parseAsync(unparsedData);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) return { error: "User not found" };
  try {
    if (await bcrypt.compare(password, user.hashedPassword)) {
      const token = jwt.sign(
        { role: user.role, user_id: user.id } satisfies jwt.JwtPayload,
        process.env.JWT_SECRET
      );
      cookies().set("token", token);
      redirect("/dashboard");
    }
  } catch (error) {
    return { error: "Invalid password" };
  }
}

export async function signOut() {
  cookies().set("token", "", { expires: new Date(0) });
  redirect("/login");
}

export async function getToken() {
  try {
    const token = cookies().get("token");
    if (!token) return null;
    const payload = jwt.verify(
      token.value,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUser(userId: string) {
  const token = await getToken();
  if (!token) return null;
  return await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });
}

export async function getSelfUser() {
  const token = await getToken();
  if (!token) return null;
  const user = await prisma.user.findUnique({
    where: { id: token.user_id },
    select: userSelect,
  });
  console.log(user);
  return user;
}

export async function getSelfRole(): Promise<RoleEnum | null> {
  const token = await getToken();
  if (!token) return null;
  return token.role;
}
