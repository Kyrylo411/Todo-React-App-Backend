import TodoItemService from "../services/TodoItemService";
import { Response, Request } from "express";

class TodoItemController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await TodoItemService.create(req.body);
      res.json(item);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async get(req: Request, res: Response): Promise<void> {
    try {
      const items = await TodoItemService.get();
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
      const updatedItems = await TodoItemService.updateMany(
        req.params.isChecked
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
    console.log(req);
    try {
      const deletedItems = await TodoItemService.deleteMany(req.body);
      res.json(deletedItems);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new TodoItemController();
