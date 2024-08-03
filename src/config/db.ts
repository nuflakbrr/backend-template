import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

if (!process.env.DB_URL) {
throw new Error("DB credentials error");
}
const connection = mysql.createConnection(process.env.DB_URL);

export const db = drizzle(connection);