import { RoleEnum } from "@prisma/client";
import { jwtVerify, JWTPayload, SignJWT } from "jose";
import { nanoid } from "nanoid";
import { z } from "zod";

export interface UserJwtPayload extends JWTPayload {
  userId: string;
  role: RoleEnum;
}

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    return null;
  }
}

export async function signToken(payload: { userId: string; role: RoleEnum }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export const loginSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

export const registerSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  accessCode: z.string(),
});
