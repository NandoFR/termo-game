import { PrismaClient } from "@prisma/client";
import { runBackup } from "@vorlefan/prisma-backup";
const prisma = new PrismaClient();

(async () => {
  const [word] = await prisma.$transaction([prisma.word.findMany({})]);

  await runBackup({
    models: {
      word,
    },
  });
})();
