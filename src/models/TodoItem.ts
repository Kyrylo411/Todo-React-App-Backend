import mongoose, { ObjectId } from "mongoose";
const { Schema, model } = mongoose;

export interface ITodoItem {
  value: string;
  done: boolean;
  _id: ObjectId;
  userId: ObjectId;
}

const TodoItem = new Schema<ITodoItem>({
  value: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
});

export default model("TodoItem", TodoItem);
