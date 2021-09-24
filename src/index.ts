import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import todoRouter from "./routes/todoRouter";
import authRouter from "./routes/authRouter";
import errorMiddleware from "./middlewares/error-middleware";
import { ITodoItem } from "./models/TodoItem";

const PORT: number = 5000;
const DB_URL: string =
  "mongodb+srv://kyrylo:kyrylo@cluster0.g6fbt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  let userRoom: string;

  socket.on("setRoom", (data: string) => {
    userRoom = data;
    socket.join(data);
  });
  socket.on("message", (data: ITodoItem) => {
    socket.broadcast.to(userRoom).emit("messages.new", data);
  });
  socket.on("deleteItem", (data: ITodoItem) => {
    socket.broadcast.to(userRoom).emit("deleteItem.new", data);
  });
  socket.on("toggleAll", (data: boolean) => {
    socket.broadcast.to(userRoom).emit("toggleAll.new", data);
  });
  socket.on("deleteCompleted", (data: ITodoItem[]) => {
    socket.broadcast.to(userRoom).emit("deleteCompleted.new", data);
  });
  socket.on("changeItemCheck", (data: any) => {
    socket.broadcast.to(userRoom).emit("changeItemCheck.new", data);
  });
  socket.on("changeItemValue", (data: any) => {
    socket.broadcast.to(userRoom).emit("changeItemValue.new", data);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/todolist", todoRouter);
app.use("/auth", authRouter);
app.use(errorMiddleware);
async function startApp(): Promise<void> {
  try {
    await mongoose.connect(`${DB_URL}`);
    server.listen(PORT, () => console.log("SERVER STARTED AT PORT :", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
