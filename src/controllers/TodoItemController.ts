import TodoItemService from "../services/TodoItemService";
import { Response, Request } from "express";
import { PatchedRequest } from "../types/types";

class TodoItemController {
  async create(req: PatchedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const { value, done } = req.body;
      const item = await TodoItemService.create(value, done, userId);
      res.json(item);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async get(req: PatchedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const items = await TodoItemService.get(userId);
      res.json(items);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedItem = await TodoItemService.update(req.body);
      res.json(updatedItem);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async updateMany(req: PatchedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const updatedItems = await TodoItemService.updateMany(
        req.params.isChecked,
        userId
      );
      res.json(updatedItems);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async delete(req: PatchedRequest, res: Response): Promise<void> {
    try {
      const item = await TodoItemService.delete(req.params.id);
      res.json(item);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteMany(req: PatchedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user._id;
      const deletedItems = await TodoItemService.deleteMany(req.body, userId);
      res.json(deletedItems);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TodoItemController();
