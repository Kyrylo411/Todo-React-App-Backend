import express from "express";
import { check } from "express-validator";

import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/auth-middlware";

const authRouter = express.Router();

authRouter.post(
  "/registration",
  [
    check("login", "Логин не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 15 символов")
      .isLength({ min: 4, max: 15 })
      .notEmpty(),
  ],
  UserController.registrtation
);
authRouter.post("/login", UserController.login);
authRouter.post("/logout", UserController.logout);
authRouter.get("/refresh", UserController.refresh);
authRouter.get("/users", authMiddleware, UserController.getUsers);

export default authRouter;
