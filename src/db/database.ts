import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import * as schema from "./schema";
import { env } from "@/env";

const pool = createPool({
  uri: env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, mode: "default" });
