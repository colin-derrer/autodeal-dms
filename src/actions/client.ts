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
  revalidatePath("/app/clients");
}
