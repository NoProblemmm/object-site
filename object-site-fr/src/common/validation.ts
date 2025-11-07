import { z } from "zod";
import { isEmail, isPassword, isName } from "./halpers/regex";

export const emailValidation = z
  .string({
    message: "Fill in the field: E-mail!",
  })
  .refine((value) => isEmail(value), {
    message: "In the field: E-mail an error was made!",
  });

export const passwordValidation = z
  .string({
    message: "Fill in the field: Password!",
  })
  .refine((value) => isPassword(value), {
    message:
      "In the field: Password an error was made!\nExample: 'Password123!'.",
  })
  .min(8, { message: "At least 8 characters" });

export const nameValidation = z
  .string({
    message: "Fill in the field: Name!",
  })
  .refine((value) => isName(value), {
    message: "In the field: Name an error was made!\nExample: 'Name/Имя'",
  })
  .max(30, { message: "Max 30 symbols" });
