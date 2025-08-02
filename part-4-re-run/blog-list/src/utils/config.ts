import { z } from "zod";

const envSchema = z.object({
  ENABLE_LOGGING: z.stringbool().default(true),
  MONGODB_URI: z.string(),
  PORT: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    }),
  JWT_SECRET: z.string().min(1, {
    message: "JWT_SECRET must be defined",
  }),
  NODE_ENV: z.enum(["PRODUCTION", "DEVELOPMENT", "TEST"]).default("DEVELOPMENT").optional(),
});

type EnvSchema = z.infer<typeof envSchema>;

const env = envSchema.parse(process.env);

const config: EnvSchema = {
  ENABLE_LOGGING: env.ENABLE_LOGGING,
  MONGODB_URI: env.MONGODB_URI,
  PORT: env.PORT,
  JWT_SECRET: env.JWT_SECRET,
  NODE_ENV: env.NODE_ENV,
};

export default config;
