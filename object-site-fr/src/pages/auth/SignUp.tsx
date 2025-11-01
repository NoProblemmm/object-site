import { useForm } from "react-hook-form";
import "./auth.css";
import { signUpFormValidation, type TSignUpSchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Input } from "../../components/ui/input/Input";
import { Button } from "../../components/ui/button/Button";
export const SignUp = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpFormValidation) });

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
              {...register("name", { required: true })}
              placeholder="Login"
            ></Input>
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
              <Button htmlType="submit">Sign in</Button>
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
    </>
  );
};
