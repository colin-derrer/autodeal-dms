import { RoleEnum } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      DATABASE_URL: string;
      BCRYPT_WORK_FACTOR: number;
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    role: RoleEnum;
    user_id: string;
  }
}

export {};
