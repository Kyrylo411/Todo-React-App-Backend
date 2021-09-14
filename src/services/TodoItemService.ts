import { ObjectId } from "mongoose";
import TodoItem, { ITodoItem } from "../models/TodoItem";

class TodoItemService {
  async create(
    value: string,
    done: boolean,
    userId: ObjectId
  ): Promise<ITodoItem> {
    const createdItem = await TodoItem.create({ value, done, userId });
    return createdItem;
  }

  async get(userId: ObjectId) {
    const items = await TodoItem.find({ userId });
    return items;
  }

  async update(item: ITodoItem): Promise<ITodoItem> {
    if (!item._id) {
      throw new Error("Id не указан");
    }
    const updatedItem: ITodoItem = await TodoItem.findByIdAndUpdate(
      item._id,
      item,
      {
        new: true,
      }
    );
    return updatedItem;
  }

  async updateMany(isChecked: string, userId: ObjectId): Promise<ITodoItem[]> {
    if (isChecked === "true") {
      const items = await TodoItem.updateMany(
        { done: { $eq: true }, userId: { $eq: userId } },
        { done: false }
      );
      return items;
    }
    if (isChecked === "false") {
      const items = await TodoItem.updateMany(
        { done: { $eq: false }, userId: { $eq: userId } },
        { done: true }
      );
      return items;
    }
  }

  async delete(id: string): Promise<ITodoItem> {
    if (!id) {
      throw new Error("Id не указан");
    }
    const item = await TodoItem.findByIdAndDelete(id);
    return item;
  }

  async deleteMany(item: ITodoItem[], userId: ObjectId): Promise<ITodoItem[]> {
    if (!item) {
      throw new Error("No items");
    }
    const items = await TodoItem.deleteMany({
      done: { $eq: true },
      userId: { $eq: userId },
    });
    return items;
  }
}

export default new TodoItemService();
