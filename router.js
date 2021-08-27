import Router from "express";
import TodoItemController from "./TodoItemController.js";

const router = new Router();

router.get("/todo", TodoItemController.get);
router.post("/todo", TodoItemController.create);
router.put("/todo/:id", TodoItemController.update);
router.put("/todo", TodoItemController.updateMany);
router.delete("/todo/:id", TodoItemController.delete);
router.delete("/todo", TodoItemController.deleteMany);

export default router;
