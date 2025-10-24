import { createFileRoute } from "@tanstack/react-router";
import { ResetPassword } from "../../pages/auth/ResetPassword";

export const Route = createFileRoute("/auth/resetPassword")({
  component: ResetPassword,
});
