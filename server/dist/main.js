import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { hasBodyParams, hasQueryParams } from "./logic/util.js";
const app = express();
const prisma = new PrismaClient();
const PORT = 5001;
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined", { skip: (req, res) => res.statusCode < 400 }));
async function main() {
    app.get("/todos", async (req, res) => {
        if (!hasQueryParams(req)) {
            try {
                const todoItems = await prisma.todoItem.findMany();
                return res.status(200).json({ data: todoItems });
            }
            catch {
                return res.status(400).json({ error: "Unable to retrieve todoItems" });
            }
        }
        else {
            if (typeof req.query.ids !== "string") {
                return res.status(400).json({ error: `Field "ids" must be a string` });
            }
            try {
                const idsArray = req.query.ids.split(",");
                const trimmedIdsArray = idsArray.map((id) => parseInt(id.trim()));
                const todoItems = await prisma.todoItem.findMany({
                    where: { id: { in: trimmedIdsArray } },
                });
                return res.status(200).json({ data: todoItems });
            }
            catch {
                return res.status(400).json({
                    error: "Unable to retrieve todoItems with the given ids",
                });
            }
        }
    });
    app.post("/todos", async (req, res) => {
        if (!req.body?.title) {
            return res.status(400).json({ error: `Field "title" must be present when creating a todoItem` });
        }
        try {
            const newTodo = await prisma.todoItem.create({
                data: req.body,
            });
            res.status(200).json({
                data: newTodo,
                message: `Successfully created a new todoItem`,
            });
        }
        catch {
            res.status(400).json({ error: "Unable to create new todoItem" });
        }
    });
    app.put("/todos/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: `Field "id" must be an integer` });
        }
        if (!hasBodyParams(req)) {
            return res.status(200).json({ message: `No fields provided to update` });
        }
        try {
            const updatedTodo = await prisma.todoItem.update({
                where: { id: id },
                data: req.body,
            });
            const updatedFields = [];
            Object.keys(updatedTodo).forEach((field) => {
                if (Object.keys(req.body).includes(field)) {
                    updatedFields.push(field);
                }
            });
            res.status(200).json({
                data: updatedTodo,
                message: `The following fields were updated: [${updatedFields.join(", ")}]`,
            });
        }
        catch (error) {
            res.status(400).json({ error: "Unable to update the given fields of the todoItem" });
        }
    });
    app.delete("/todos/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ error: `Field "id" must be an integer` });
        }
        try {
            await prisma.todoItem.delete({ where: { id: id } });
            res.status(200).json({ message: `Successfully deleted todoItem` });
        }
        catch {
            res.status(400).json({ error: "Unable to delete todoItem" });
        }
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
