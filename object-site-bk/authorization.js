import { User } from "./Data.js";
import { generateTokens } from "./src/token/Token.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export function authorizeUser(email, password) {
  const user = User.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "Пользователь не найден" };
  }

  if (user.password !== password) {
    return { success: false, message: "Неверный пароль" };
  }

  const token = generateTokens({ id: user.id, email: user.email });
  const accessToken = token.accessToken;
  const refreshToken = token.refreshToken;
  return {
    success: true,
    accessToken,
    refreshToken,
  };
}
