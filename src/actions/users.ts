"use server";

import { prisma } from "@/lib/prisma";
import { Prisma, RoleEnum } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  hashedPassword: z.string(),
  role: z.nativeEnum(RoleEnum),
}) satisfies z.ZodType<Prisma.UserCreateInput>;

const updateUserSchema = createUserSchema.partial().omit({ email: true });

export async function createUser(
  unparsedData: z.infer<typeof createUserSchema>
) {
  const parsedData = await createUserSchema.parseAsync(unparsedData);
  parsedData.hashedPassword = await bcrypt.hash(
    parsedData.hashedPassword,
    process.env.BCRYPT_WORK_FACTOR
  );
  await prisma.user.create({ data: parsedData });
}

export async function updateUser(
  id: string,
  unparsedData: z.infer<typeof updateUserSchema>
) {
  const parsedData = await updateUserSchema.parseAsync(unparsedData);
  if (parsedData.hashedPassword) {
    parsedData.hashedPassword = await bcrypt.hash(
      parsedData.hashedPassword,
      process.env.BCRYPT_WORK_FACTOR
    );
  }
  await prisma.user.update({ where: { id }, data: parsedData });
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
}

export async function getUser(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUsers() {
  return prisma.user.findMany();
}
