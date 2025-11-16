import { useState } from "react";
import { useForm } from "react-hook-form";
import { Api } from "@api/Api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "@components/ui/input/Input";
import { Button } from "@components/ui/button/Button";
import { Footer } from "@components/ui/footer/Footer";
import type { ISignUpRequest } from "@api/data-details";
import { signUpFormValidation, type TSignUpSchema } from "./validations";
import "./auth.css";

export const SignUp: React.FC = () => {
  const [isPassword, setIsPassword] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpFormValidation) });

  const navigate = useNavigate();

  const submitSignIn = async (data: ISignUpRequest) => {
    const response = await Api().signUp(data);
    if (response.success) {
      navigate({ to: "/auth/signIn" });
    }
  };
  return (
    <>
      <div className="signin__container">
        <div className="signin__card">
          <form className="form__signin" onSubmit={handleSubmit(submitSignIn)}>
            <p className="form__title" onClick={() => navigate({ to: "/" })}>
              Next track
            </p>
            <Input
              {...register("name", { required: true })}
              placeholder="Name"
            ></Input>
            {errors.name && (
              <p className="form__error">{errors.name.message}</p>
            )}
            <Input
              {...register("email", { required: true })}
              placeholder="E-mail"
            ></Input>
            {errors.email && (
              <p className="form__error">{errors.email.message}</p>
            )}
            <div className="password_container">
              <Input.Password
                {...register("password", { required: true })}
                type={isPassword ? "password" : "text"}
                placeholder="Password"
              ></Input.Password>
              <img
                src="/static/eye.svg"
                alt=""
                className={`eye__password ${!isPassword && "active"}`}
                onClick={() => setIsPassword(!isPassword)}
              />
            </div>
            {errors.password && (
              <p className="form__error">{errors.password.message}</p>
            )}
            <Input.Password
              {...register("confirmPassword", { required: true })}
              type="password"
              placeholder="Confirm Password"
            ></Input.Password>
            {errors.confirmPassword && (
              <p className="form__error">{errors.confirmPassword.message}</p>
            )}

            <div className="form__button">
              <Button htmlType="submit">Sign Up</Button>
              <p
                className="form__option"
                onClick={() => navigate({ to: "/auth/signIn" })}
              >
                Sign In
              </p>
              <p
                className="form__option"
                onClick={() => navigate({ to: "/auth/resetPassword" })}
              >
                Reset password?
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
