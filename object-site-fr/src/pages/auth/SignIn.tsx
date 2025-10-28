import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button/Button";
import { Input } from "../../components/ui/input/Input";
import { signInFormValidation, type TSignInSchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import "./auth.css";
import { useNavigate } from "@tanstack/react-router";
import { useSessionStore } from "../../store/session/Session.store";
import type { ISignInRequest } from "../../api/data-details";

export const SignIn = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInFormValidation) });

  const { signInStore } = useSessionStore;
  const navigate = useNavigate();

  const submitSignIn = async (data: ISignInRequest) => {
    try {
      const responce = await signInStore(data);
      if (responce) {
        setTimeout(() => {
          navigate({ to: "/" });
        }, 500);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="signin__container">
        <div className="signin__card">
          <form className="form__signin" onSubmit={handleSubmit(submitSignIn)}>
            <Input
              {...register("email", { required: true })}
              placeholder="Login"
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
            <div className="form__button">
              <Button>Sign in</Button>
              <p
                className="form__option"
                onClick={() => navigate({ to: "/auth/signUp" })}
              >
                Sign Up
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
    </>
  );
};
