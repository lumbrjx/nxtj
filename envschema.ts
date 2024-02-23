import z from "zod";

const envSchema = z.object({
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_DB: z.string().min(1),

  PG_DATABASE: z.string().min(1),
  SCHEMA_PATH: z.string().min(1),
  OUT_PATH: z.string().min(1),

  NEXTAUTH_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),

  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const envServer = envSchema.safeParse({
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PG_DATABASE: process.env.PG_DATABASE,
  SCHEMA_PATH: process.env.SCHEMA_PATH,
  OUT_PATH: process.env.OUT_PATH,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});

if (!envServer.success) {
  throw new Error(
    "There is an error with the server environment variables",
    envServer.error,
  );
}

export const envServerSchema = envServer.data;
type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
