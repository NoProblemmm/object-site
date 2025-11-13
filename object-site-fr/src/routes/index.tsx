import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../pages/home/Home";
import { useSessionStore } from "@store/session/Session.store";
import { playerStore } from "@store/player/Player.store";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    useSessionStore.refreshSession().then(() => {
      if (!playerStore.tracks || playerStore.tracks.length === 0)
        playerStore.getTrackStore();
      if (!playerStore.myTracks || playerStore.myTracks.length === 0)
        playerStore.getMyTrack();
    });
  },
  component: Home,
});
