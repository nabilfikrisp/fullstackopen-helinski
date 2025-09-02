import { z } from "zod";

import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string({ error: "MONGODB_URI must be defined" }),
  PORT: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    }),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(["PRODUCTION", "DEVELOPMENT", "TEST"]),
});

const ENV = envSchema.parse(process.env);

export default ENV;
