import mongoose, { ObjectId } from "mongoose";
const { Schema, model } = mongoose;

export interface IToken {
  user: ObjectId;
  refreshToken: string;
}

const TokenSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, required: true },
});

export default model("Token", TokenSchema);
