import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";

const PORT = 4000;
const DB_URL = `mongodb+srv://kyrylo:kyrylo@cluster0.g6fbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();

app.use(express.json());
app.use("/api", router);
app.use(cors());

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
