import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({});

export default {
  schema: process.env.SCHEMA_PATH,
  out: process.env.OUT_PATH,

  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.PG_DATABASE,
    ssl: false,
  },
  verbose: true,
  strict: false,
} satisfies Config;
