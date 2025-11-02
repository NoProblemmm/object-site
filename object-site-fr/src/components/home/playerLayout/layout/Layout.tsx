import { observer } from "mobx-react-lite";
import { Player } from "../../../ui/home/player/Player";
import { TabMenu } from "../../../ui/home/tabMenu/TabMenu";
import { useSessionStore } from "../../../../store/session/Session.store";
import { MyTrackMenu } from "../../../ui/home/myTrackMenu/MyTrackMenu";
import { playerStore } from "../../../../store/player/Player.store";
import { useEffect } from "react";
import "./Layout.css";

export const Layout = observer(() => {
  const handleResize = () => {
    if (window.innerWidth > 1000) {
      playerStore.menuPage("NextTrack");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="container">
        {useSessionStore.isAutentificate && <TabMenu />}
        {playerStore.submenu === "MyTrack" && <MyTrackMenu />}
        {playerStore.submenu === "NextTrack" && (
          <div className="card__container">
            <Player />
          </div>
        )}
      </div>
    </>
  );
});
