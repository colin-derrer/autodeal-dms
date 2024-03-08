"use server";

import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function generateClient({
  setAssignedUser,
}: {
  setAssignedUser?: string;
}) {
  const name = faker.person.firstName();
  const clientData = {
    name,
    email: faker.internet.email({ firstName: name }),
    phone: faker.phone.number(),
    lead: "MANUALLY_ADDED",
    clientPhase: "New",
    assignedUserId: setAssignedUser,
  } satisfies Prisma.ClientUncheckedCreateInput;
  await prisma.client.create({ data: clientData });

  revalidatePath("/clients");
}

export async function assignClient({
  clientId,
  assignedUserId,
}: {
  clientId: string;
  assignedUserId: string;
}) {
  await prisma.client.update({
    where: { id: clientId },
    data: { assignedUserId },
  });

  revalidatePath("/clients");
}

export async function updateClient({
  clientId, clientData
}: {
  clientId: string;
  clientData: Prisma.ClientUpdateInput;
}) {
  await prisma.client.update({
    where: { id: clientId },
    data: clientData,
  });

  revalidatePath("/clients");
}