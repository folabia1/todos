/*
  Warnings:

  - You are about to drop the column `completeted` on the `TodoItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_TodoItem" ("description", "dueDate", "id", "title") SELECT "description", "dueDate", "id", "title" FROM "TodoItem";
DROP TABLE "TodoItem";
ALTER TABLE "new_TodoItem" RENAME TO "TodoItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
