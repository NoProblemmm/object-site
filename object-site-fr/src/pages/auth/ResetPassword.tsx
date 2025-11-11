import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@components/ui/input/Input";
import { Button } from "@components/ui/button/Button";
import {
  resetPasswordFormValidation,
  type TResetPasswordSchema,
} from "./validations";
import "./auth.css";
import { Footer } from "@components/ui/footer/Footer";

export const ResetPassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordFormValidation),
  });

  const navigate = useNavigate();

  const submitSignIn = () => {};

  return (
    <>
      <div className="signin__container">
        <div className="signin__card">
          <form className="form__signin" onSubmit={handleSubmit(submitSignIn)}>
            <p className="form__title" onClick={() => navigate({ to: "/" })}>
              Next track
            </p>
            <Input
              {...register("email", { required: true })}
              placeholder="E-mail"
            ></Input>
            {errors.email && (
              <p className="form__error">{errors.email.message}</p>
            )}
            <Input.Password
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
            ></Input.Password>

            {errors.password && (
              <p className="form__error">{errors.password.message}</p>
            )}
            <Input.Password
              {...register("confirmPassword", { required: true })}
              type="password"
              placeholder="Confirm password"
            ></Input.Password>
            <div className="form__button">
              <Button htmlType="submit">Reset password</Button>
              <p
                className="form__option"
                onClick={() => navigate({ to: "/auth/signIn" })}
              >
                Sign In
              </p>
              <p
                className="form__option"
                onClick={() => navigate({ to: "/auth/signUp" })}
              >
                Sign Up
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
