import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable('user', {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", {length : 265}).notNull(),
});