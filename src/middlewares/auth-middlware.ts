import TokenService from "../services/TokenService";
import { Response, NextFunction } from "express";
import { PatchedRequest } from "../types/types";

export default function authMiddleware(
  req: PatchedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = <string>req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Пользователь не авторизован");
    }
    const accessToken = <string>authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("Пользователь не авторизован");
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("Пользователь не авторизован");
    }
    console.log(typeof userData);
    req.user = userData._doc;
    next();
  } catch (e) {
    next(new Error(e));
  }
}
