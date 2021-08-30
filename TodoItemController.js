import TodoItemService from "./TodoItemService.js";

class TodoItemController {
  async create(req, res) {
    try {
      const item = await TodoItemService.create(req.body);
      res.json(item);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async get(req, res) {
    try {
      const items = await TodoItemService.get();
      return res.json(items);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedItem = await TodoItemService.update(req.body);
      res.json(updatedItem);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateMany(req, res) {
    try {
      const updatedItems = await TodoItemService.updateMany(
        req.params.isChecked
      );
      res.json(updatedItems);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const item = await TodoItemService.delete(req.params.id);
      res.json(item);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async deleteMany(req, res) {
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
