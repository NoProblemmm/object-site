import { User } from "../../Data.js";
import { generateTokens } from "../common/token/Token.js";

export function authorizeUser(email, password) {
  const user = User.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "User not found!" };
  }

  if (user.password !== password) {
    return { success: false, message: "Invalid password!" };
  }

  const token = generateTokens({ id: user.id, email: user.email });
  const accessToken = token.accessToken;
  const refreshToken = token.refreshToken;
  return {
    user,
    success: true,
    accessToken,
    refreshToken,
  };
}
