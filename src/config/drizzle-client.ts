import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../server/db/schema";

export const pool = new Pool({
  connectionString: process.env.PG_DATABASE,
  ssl: false,
});

export const db = drizzle(pool, { schema });
