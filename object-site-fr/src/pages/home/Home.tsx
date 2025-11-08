import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Layout } from "@components/home/playerLayout/layout/Layout";
import { Footer } from "@components/ui/footer/Footer";
import { Header } from "@components/ui/header/Head";
import { LeftSider } from "@components/home/leftSider/LeftSider";
import { RightSider } from "@components/home/rightSider/RightSider";
import { playerStore } from "@store/player/Player.store";
import { useSessionStore } from "@store/session/Session.store";
import "./Home.css";

export const Home: React.FC = observer(() => {
  const links = [
    { name: "Welcome", link: "/welcome" },
    { name: "Settings", link: "/settings" },
    {
      name: useSessionStore.isAutentificate ? "Exit" : "Sign In",
      link: "/auth/signIn",
      callback: async () => {
        await useSessionStore.isLogout();
      },
    },
  ];
  useEffect(() => {
    try {
      useSessionStore
        .refreshSession()
        .then(() => {
          if (!playerStore.tracks || playerStore.tracks.length === 0)
            playerStore.getTrackStore();
          if (!playerStore.myTracks || playerStore.myTracks.length === 0)
            playerStore.getMyTrack();
        })
        .catch((error) => {
          console.error("Error update session:", error);
        });
    } catch (err) {
      console.error("Service error:", err);
    }
  }, []);
  return (
    <>
      <Header links={links} />
      <div className="layout-container">
        {useSessionStore.isAutentificate && <LeftSider />}
        <Layout />
        <RightSider />
      </div>
      <Footer />
    </>
  );
});
