"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createVehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  vinId: z.string(),
  color: z.string(),
  price: z.number().int(),
}) satisfies z.ZodType<Prisma.VehicleCreateInput>;

const updateVehicleSchema = createVehicleSchema.partial().omit({ vinId: true });

export async function createVehicle(
  unparsedData: z.infer<typeof createVehicleSchema>
) {
  const parsedData = await createVehicleSchema.parseAsync(unparsedData);
  await prisma.vehicle.create({ data: parsedData });
  revalidatePath("/vehicles");
}

export async function updateVehicle(
  vinId: string,
  unparsedData: z.infer<typeof updateVehicleSchema>
) {
  const parsedData = await updateVehicleSchema.parseAsync(unparsedData);
  await prisma.vehicle.update({ where: { vinId }, data: parsedData });
  revalidatePath("/vehicles");
}

export async function deleteVehicle(vinId: string) {
  await prisma.vehicle.delete({ where: { vinId } });
  revalidatePath("/vehicles");
}

export async function getVehicle(vinId: string) {
  return prisma.vehicle.findUnique({ where: { vinId } });
}

export async function getVehicles() {
  return prisma.vehicle.findMany();
}
