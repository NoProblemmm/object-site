import { playerStore } from "@store/player/Player.store";
import { Profile } from "../pages/profile/Profile";
import { useSessionStore } from "@store/session/Session.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: async () => {
    if (!useSessionStore.isAutentificate) {
      await useSessionStore.refreshSession().then(async () => {
        await playerStore.getMyTrack().then(() => {
          if (!useSessionStore.isAutentificate) {
            throw redirect({ to: "/auth/signIn" });
          }
        });
      });
    }
  },
  component: Profile,
});
