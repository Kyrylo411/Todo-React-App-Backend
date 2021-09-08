import TodoItemService from "../services/TodoItemService";
import { Response, Request } from "express";

class TodoItemController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { value, done, userId } = req.body;
      const item = await TodoItemService.create(value, done, userId);
      res.json(item);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const items = await TodoItemService.get(req.body.userId);
      res.json(items);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem = await TodoItemService.update(req.body);
      res.json(updatedItem);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateMany(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      const updatedItems = await TodoItemService.updateMany(
        req.params.isChecked,
        userId
      );
      res.json(updatedItems);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const item = await TodoItemService.delete(req.params.id);
      res.json(item);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteMany(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;

      const deletedItems = await TodoItemService.deleteMany(req.body, userId);
      res.json(deletedItems);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TodoItemController();
