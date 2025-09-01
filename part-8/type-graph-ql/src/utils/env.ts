import { z } from "zod";

import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string({
    error: "Invalid MONGODB_URI in .env",
  }),
  PORT: z
    .string({
      error: "Invalid PORT in .env",
    })
    .transform(Number)
    .refine((val) => !isNaN(val), {
      error: "Invalid PORT in .env",
    }),
  JWT_SECRET: z.string({
    error: "Invalid JWT_SECRET in .env",
  }),
  NODE_ENV: z.enum(["PRODUCTION", "DEVELOPMENT", "TEST"], {
    error:
      "Invalid NODE_ENV in .env, must be one of 'PRODUCTION', 'DEVELOPMENT', or 'TEST'",
  }),
});

const ENV = envSchema.parse(process.env);

export default ENV;
