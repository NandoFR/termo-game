import fs from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";
(async () => {
  const prisma = new PrismaClient();
  let rawdata = await fs.readFile(path.resolve(".db", "word.json"));
  let data = JSON.parse(Buffer.from(rawdata).toString());

  while (true) {
    const value = data.shift();
    if (!value) break;
    console.log(value);
    await prisma.word.create({
      data: value,
    });
  }
})();
