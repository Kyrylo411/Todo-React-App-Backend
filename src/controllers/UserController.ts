import UserService from "../services/UserService";
import { validationResult } from "express-validator";
import { Response, Request } from "express";

class UserController {
  async registrtation(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
      }
      const { login, password } = req.body;
      const userData = await UserService.registrtation(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      const userData = await UserService.login(login, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const token = UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllusers();
      return res.json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async createTodoItem(req: Request, res: Response) {
    try {
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
