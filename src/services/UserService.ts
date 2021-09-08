import bcrypt from "bcrypt";
import TokenService from "./TokenService";
import userModel, { IUser } from "../models/User";
import { IGeneratedTokens, IRegistration } from "../types/types";
import { JwtPayload } from "jsonwebtoken";

class UserService {
  async registrtation(login: string, password: string): Promise<IRegistration> {
    const candidate = await userModel.findOne({ login });
    if (candidate) {
      throw new Error(`Пользователь с именем ${login} уже существует`);
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
      user,
    };
  }

  async login(login: string, password: string): Promise<IRegistration> {
    const user: IUser = await userModel.findOne({ login });
    if (!user) {
      throw new Error(`Пользователь с именем ${login} не найден!`);
    }
    const isPassEqual: boolean = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw new Error(`Введен неверный пароль!`);
    }
    const tokens = <IGeneratedTokens>TokenService.generateTokens({ ...user });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string): Promise<IRegistration> {
    if (!refreshToken) {
      throw new Error("Пользователь не авторизован");
    }
    const userData: JwtPayload =
      TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new Error("Пользователь не авторизован");
    }
    const user = await userModel.findById(userData.id);
    const tokens = TokenService.generateTokens({ ...user });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async getAllusers() {
    const users = await userModel.find();
    return users;
  }
}
export default new UserService();
