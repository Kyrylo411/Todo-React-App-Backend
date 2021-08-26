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
  async update(item) {
    if (!item._id) {
      throw new Error("Id не указан");
    }
    const updatedItem = await TodoItem.findByIdAndUpdate(item._id, item, {
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
}

export default new TodoItemService();
