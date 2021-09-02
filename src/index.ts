import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "../routes/router";

const PORT: number = 5000;
const DB_URL: string = `mongodb+srv://kyrylo:kyrylo@cluster0.g6fbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

async function startApp(): Promise<void> {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log("SERVER STARTED AT PORT :", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
