import { z } from "zod";
import { emailValidation, passwordValidation } from "../../common/validation";

export const signInFormValidation = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpFormValidation = z
  .object({
    login: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpFormValidation>;
export type TSignInSchema = z.infer<typeof signInFormValidation>;
