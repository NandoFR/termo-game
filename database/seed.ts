import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { Word } from "./Word";
import mongoose from "mongoose";

(async () => {
  await mongoose.connect(process.env.DATABASE_URL!);
  const file = JSON.parse(
    Buffer.from(
      await fs.readFile(path.resolve("database", "word.json"))
    ).toString()
  );

  while (true) {
    const row = file.shift();
    if (!row) break;

    const newWord = await Word.create({
      length: row.length,
      name: row.name,
    });

    console.log(newWord);
  }
})();
