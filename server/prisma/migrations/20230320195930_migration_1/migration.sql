-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" INTEGER,
    "completeted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_TodoItem" ("completeted", "description", "dueDate", "id", "title") SELECT "completeted", "description", "dueDate", "id", "title" FROM "TodoItem";
DROP TABLE "TodoItem";
ALTER TABLE "new_TodoItem" RENAME TO "TodoItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
