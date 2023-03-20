-- CreateTable
CREATE TABLE "TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" INTEGER NOT NULL,
    "completeted" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TodoItem_title_key" ON "TodoItem"("title");
