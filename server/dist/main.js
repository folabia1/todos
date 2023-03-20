import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
const PORT = 5001;
async function main() {
    await prisma.todoItem.create({
        data: { title: "my first note" },
    });
    app.get("/todos", async (req, res) => {
        let todoItems = [];
        if (!req.query.ids)
            res.send();
        todoItems = await prisma.todoItem.findMany();
        res.json(todoItems);
    });
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
