import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "../../pages/auth/SignIn";

export const Route = createFileRoute("/auth/signIn")({
  component: SignIn,
});
