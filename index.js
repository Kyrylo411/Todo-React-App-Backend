import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";

const PORT = 5000;
const DB_URL = `mongodb+srv://kyrylo:kyrylo@cluster0.g6fbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("SERVER STARTED AT PORT :", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
