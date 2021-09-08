import mongoose, { ObjectId } from "mongoose";

const { Schema, model } = mongoose;

export interface IUser {
  login: string;
  password: string;
  _id: ObjectId;
}

const UserSchema = new Schema<IUser>({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default model("User", UserSchema);
