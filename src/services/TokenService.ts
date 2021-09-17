import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/User";
import { ObjectId } from "mongoose";
import tokenModel, { IToken } from "../models/Token";
import { IGeneratedTokens } from "../types/types";

class TokenService {
  generateTokens(payload: IUser): IGeneratedTokens {
    const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(
      payload,
      `${process.env.JWT_REFRESH_SECRET}`,
      { expiresIn: "30d" }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): JwtPayload {
    try {
      const userData = jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`);
      return userData as JwtPayload;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): JwtPayload {
    try {
      const userData = jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`);
      return userData as JwtPayload;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: ObjectId, refreshToken: string): Promise<IToken> {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const newData = await tokenData.save();
      return newData;
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({
      refreshToken,
    });
    return tokenData;
  }

  async findToken(refreshToken: string): Promise<IToken> {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }
}
export default new TokenService();
