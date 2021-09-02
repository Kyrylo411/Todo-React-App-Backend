import express from "express";

import TodoItemController from "../controllers/TodoItemController";

const router = express.Router();

router.get("/todo", TodoItemController.get);
router.post("/todo", TodoItemController.create);
router.put("/todo", TodoItemController.update);
router.put("/todo/:isChecked", TodoItemController.updateMany);
router.delete("/todo/:id", TodoItemController.delete);
router.delete("/todo", TodoItemController.deleteMany);

export default router;
