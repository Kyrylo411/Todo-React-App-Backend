import TokenService from "../services/TokenService";
import { Response, NextFunction } from "express";
import { PatchedRequest } from "../types/types";
import ApiError from "../exeptions/api-error";

export default function authMiddleware(
  req: PatchedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = <string>req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }
    const accessToken = <string>authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    req.user = userData._doc;
    next();
  } catch (e) {
    return next(ApiError.UnautorizedError());
  }
}
