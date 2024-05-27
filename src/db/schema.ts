import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const bids = mysqlTable("bb_bids", {
  id: serial("id").primaryKey(),
  //   name: varchar('name', { length: 255 }).notNull(),
});
