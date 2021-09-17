import bcrypt from "bcrypt";
import TokenService from "./TokenService";
import userModel, { IUser } from "../models/User";
import { IGeneratedTokens, IRegistration } from "../types/types";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../exeptions/api-error";

class UserService {
  async registrtation(login: string, password: string): Promise<IRegistration> {
    const candidate = await userModel.findOne({ login });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с именем ${login} уже существует`
      );
    }
    const hashPassword: string = await bcrypt.hash(password, 3);

    const user: IUser = await userModel.create({
      login,
      password: hashPassword,
    });

    const tokens = <IGeneratedTokens>TokenService.generateTokens({ ...user });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }

  async login(login: string, password: string): Promise<IRegistration> {
    const user: IUser = await userModel.findOne({ login });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с именем ${login} не найден!`);
    }
    const isPassEqual: boolean = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest(`Введен неверный пароль!`);
    }
    const tokens = <IGeneratedTokens>TokenService.generateTokens({ ...user });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string): Promise<IRegistration> {
    if (!refreshToken) {
      throw ApiError.UnautorizedError();
    }
    const userData: JwtPayload =
      TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnautorizedError();
    }
    const user = await userModel.findById(userData._doc._id);
    const tokens = TokenService.generateTokens({ ...user });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }

  async getAllusers() {
    const users = await userModel.find();
    return users;
  }
}
export default new UserService();
