import express from "express";
import TodoItemController from "../controllers/TodoItemController";
import authMiddleware from "../middlewares/auth-middlware";

const todoRouter = express.Router();

todoRouter.get("/todo", authMiddleware, TodoItemController.get);
todoRouter.post("/todo", authMiddleware, TodoItemController.create);
todoRouter.put("/todo", authMiddleware, TodoItemController.update);
todoRouter.put(
  "/todo/:isChecked",
  authMiddleware,
  TodoItemController.updateMany
);

todoRouter.delete("/todo/:id", authMiddleware, TodoItemController.delete);
todoRouter.delete("/todo", authMiddleware, TodoItemController.deleteMany);
