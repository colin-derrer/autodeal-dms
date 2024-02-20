"use server";

import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Prisma, RoleEnum } from "@prisma/client";

const userSelect = {
  id: true,
  name: true,
  organizationId: true,
  dealership: {
    select: {
      id: true,
    },
  },
} satisfies Prisma.UserSelect;

export async function setToken(unparsedData: {
  org_id: string;
  role: RoleEnum;
  user_id: string;
}) {
  try {
    const { org_id, role, user_id } = await z
      .object({
        org_id: z.string(),
        role: z.nativeEnum(RoleEnum),
        user_id: z.string(),
      })
      .parseAsync(unparsedData);
    const token = jwt.sign(
      { org_id, role, user_id } satisfies jwt.JwtPayload,
      process.env.PRIVATE_JWT_SECRET
    );
    cookies().set("token", token);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getToken() {
  try {
    const token = cookies().get("token");
    if (!token) return null;
    const payload = jwt.verify(
      token.value,
      process.env.PRIVATE_JWT_SECRET
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

export async function getUserRole(
  unparsedUserId: string,
  unparsedDealershipId: string
): Promise<RoleEnum | null> {
  const parseResult = await z
    .object({
      userId: z.string(),
      dealershipId: z.string(),
    })
    .safeParse({ userId: unparsedUserId, dealershipId: unparsedDealershipId });
  if (!parseResult.success) return null;
  const roles = await prisma.user.findUnique({
    where: {
      id: parseResult.data.userId,
    },
    select: {
      dealershipMemberships: {
        where: {
          dealershipId: parseResult.data.dealershipId,
        },
        select: {
          role: true,
        },
      },
    },
  });
  if (!roles || roles.dealershipMemberships.length === 0) return null;
  return roles.dealershipMemberships[0].role;
}
