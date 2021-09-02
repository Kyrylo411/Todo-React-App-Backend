import mongoose from "mongoose";

export interface ITodoItem {
  value: string;
  done: boolean;
  _id?: string;
}

const TodoItem = new mongoose.Schema<ITodoItem>({
  value: { type: String, required: true },
  done: { type: Boolean, required: true },
});

export default mongoose.model("TodoItem", TodoItem);
