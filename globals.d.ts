import { RoleEnum } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIVATE_JWT_SECRET: string;
      PRIVATE_DATABASE_URL: string;
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    role: RoleEnum;
    org_id: string;
    user_id: string;
  }
}

export {};
