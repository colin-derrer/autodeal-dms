import { RoleEnum } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      BCRYPT_WORK_FACTOR: number;
      REGISTER_CODE: string;
    }
  }
}
