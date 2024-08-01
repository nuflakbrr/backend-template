import { PrismaClient } from "./generated/client";
import { hash } from "bcrypt";

const db = new PrismaClient();

async function main() {
  await db.user.create({
    data: {
      email: "example@gmail.com",
      username: "example",
      name: "Example",
      password: await hash("password", 10),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });