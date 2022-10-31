/*
  Warnings:

  - Added the required column `length` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "length" INTEGER NOT NULL
);
INSERT INTO "new_Word" ("id", "name") SELECT "id", "name" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
