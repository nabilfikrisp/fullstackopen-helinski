import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z
    .string()
    .transform(Number)
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    }),
});

type EnvSchema = z.infer<typeof envSchema>;

const env = envSchema.parse(process.env);

const config: EnvSchema = {
  MONGODB_URI: env.MONGODB_URI,
  PORT: env.PORT,
};

export default config;
