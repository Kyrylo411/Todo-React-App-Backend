import express from "express";
import TodoItemController from "../controllers/TodoItemController";
import authMiddleware from "../middlewares/auth-middlware";

const todoRouter = express.Router();

todoRouter.get("/todo/:id", authMiddleware, TodoItemController.get);
todoRouter.post("/todo/:id", authMiddleware, TodoItemController.create);
todoRouter.put("/todo", authMiddleware, TodoItemController.update);
todoRouter.delete("/todo/:id", authMiddleware, TodoItemController.delete);
todoRouter.delete(
  "/todo/deleteMany/:id",
  authMiddleware,
  TodoItemController.deleteMany
);
todoRouter.put(
  "/todo/:isChecked/:id",
  authMiddleware,
  TodoItemController.updateMany
);
export default todoRouter;
