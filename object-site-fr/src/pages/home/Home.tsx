import { Layout } from "../../components/home/playerLayout/layout/Layout";
import { Footer } from "../../components/ui/footer/Footer";
import { Header } from "../../components/ui/header/Head";
import { LeftSider } from "../../components/home/leftSider/LeftSider";
import { RightSider } from "../../components/home/rightSider/RightSider";
import "./Home.css";
import { useEffect } from "react";
import { playerStore } from "../../store/player/Player.store";
import { useSessionStore } from "../../store/session/Session.store";
import { observer } from "mobx-react-lite";
import { useApiTokenProvider } from "../../api/ApiToken.provider";
export const Home = observer(() => {
  const links = [
    { name: "Welcome", link: "/welcome" },
    {
      name: useSessionStore.isAutentificate ? "Exit" : "Sign In",
      link: "/auth/signIn",
      callback: async () => {
        await useSessionStore.isLogout();
      },
    },
  ];
  useEffect(() => {
    if (!useApiTokenProvider.accessToken) {
      useSessionStore.refreshSession().then(() => {
        if (playerStore.tracks.length === 0) playerStore.getTrackStore();
        if (playerStore.myTracks.length === 0) playerStore.getMyTrack();
        console.log(useSessionStore.isAutentificate);
      });
    } else {
      if (playerStore.tracks.length === 0) playerStore.getTrackStore();
      if (playerStore.myTracks.length === 0) playerStore.getMyTrack();

      console.log(useSessionStore.isAutentificate);
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
