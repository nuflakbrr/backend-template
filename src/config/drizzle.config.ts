import { defineConfig } from "drizzle-kit";

if (!process.env.DB_URL) {
  throw new Error("DB URL is missing");
}
export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "mysql", // "mysql" || "postgres" || "sqlite"
    dbCredentials: {
        url: process.env.DB_URL,
    },
});