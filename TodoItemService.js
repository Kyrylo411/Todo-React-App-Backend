import TodoItem from "./TodoItem.js";

class TodoItemService {
  async create(item) {
    const createdItem = await TodoItem.create(item);
    return createdItem;
  }
  async get() {
    const items = await TodoItem.find();
    return items;
  }
  async update(item, id) {
    if (!id) {
      throw new Error("Id не указан");
    }
    const updatedItem = await TodoItem.findByIdAndUpdate(id, item, {
      new: true,
    });
    return updatedItem;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Id не указан");
    }
    const item = await TodoItem.findByIdAndDelete(id);
    return item;
  }
  async deleteMany(item) {
    if (!item) {
      throw new Error("No items");
    }
    const items = await TodoItem.deleteMany({ done: { $eq: true } });
    return items;
  }
}

export default new TodoItemService();
