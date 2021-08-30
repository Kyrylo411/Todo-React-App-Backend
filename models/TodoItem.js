import mongoose from "mongoose";

const TodoItem = new mongoose.Schema({
  value: { type: String, required: true },
  done: { type: Boolean, required: true },
});

export default mongoose.model("TodoItem", TodoItem);
