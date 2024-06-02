import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";
import * as schema from "./schema";
import { env } from "@/env";

const pool = createPool({
  // uri: env.DATABASE_URL!,
  host: "localhost",
  user: "root",
  password: "root",
  database: "bid-buddy",
});

export const db = drizzle(pool, { schema, mode: "default" });

// import { env } from "@/env";
// import * as schema from "./schema";
// import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// declare global {
//   // eslint-disable-next-line no-var -- only var works here
//   var database: PostgresJsDatabase<typeof schema> | undefined;
// }

// let database: PostgresJsDatabase<typeof schema>;
// let pg: ReturnType<typeof postgres>;

// if (env.NODE_ENV === "production") {
//   pg = postgres(env.DATABASE_URL);
//   database = drizzle(pg, { schema });
// } else {
//   if (!global.database) {
//     pg = postgres(env.DATABASE_URL);
//     global.database = drizzle(pg, { schema });
//   }
//   database = global.database;
// }

// export { database, pg };
