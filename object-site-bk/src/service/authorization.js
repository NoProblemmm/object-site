import { User } from "../../Data.js";
import { generateTokens } from "../common/token/Token.js";
import bcrypt from "bcrypt";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../common/validation/validation.js";

export async function authorizeUser(email, password) {
  const user = User.find((u) => u.email === email);
  if (!user) {
    return { success: false, message: "User not found!" };
  }
  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    if (password !== user.password) {
      return { success: false, message: "Invalid password!" };
    }
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

export function validationSignUp(email, password, name) {
  try {
    const user = User.find((u) => u.email === email);

    if (!isValidEmail(email)) {
      return {
        success: false,
        message: "Invalid email address!",
      };
    }
    if (!isValidPassword(password)) {
      return {
        success: false,
        message: "Invalid password!",
      };
    }
    if (!isValidName(name)) {
      return {
        success: false,
        message: "Invalid name!",
      };
    }

    if (user) {
      return {
        success: false,
        message: "A user with such an email already exists!",
      };
    } else {
      return {
        success: true,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
    };
  }
}
