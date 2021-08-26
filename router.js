import Router from "express";
import TodoItemController from "./TodoItemController.js";

const router = new Router();

router.get("/todoList", TodoItemController.get);
router.post("/todoList", TodoItemController.create);
router.put("/todoList", TodoItemController.update);
router.delete("/todoList/:id", TodoItemController.delete);

export default router;
