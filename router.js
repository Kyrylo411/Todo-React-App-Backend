import Router from "express";
import TodoItemController from "./TodoItemController.js";

const router = new Router();

router.get("/GET/todo", TodoItemController.get);
router.post("/POST/todo", TodoItemController.create);
router.put("/PUT/todo", TodoItemController.update);
router.delete("/DELETE/todo/:id", TodoItemController.delete);

export default router;
