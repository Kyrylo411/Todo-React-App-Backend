import { IUser } from "../models/User";
import { Request } from "express";

export interface PatchedRequest extends Request {
  user?: IUser;
}

export interface IGeneratedTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IRegistration {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
