import { playerStore } from "@store/player/Player.store";
import { observer } from "mobx-react-lite";
import { TrackState } from "@store/player/Player.type";
import "./TabMenu.css";

export const TabMenu = observer(() => {
  const handleMenu = (item: string) => {
    playerStore.menuPage(item);
  };
  return (
    <div className="tabmenu__container">
      <ul className="tabmenu__menu">
        {playerStore.currentTrackSource !== TrackState.Wind && (
          <li
            className="item__wind"
            onClick={() =>
              playerStore.playTrack(
                Math.floor(Math.random() * playerStore.tracks.length)
              )
            }
          >
            Wind
          </li>
        )}
        <li
          className="tabmenu__menu-items"
          onClick={() => handleMenu("Player")}
        >
          Player
        </li>
        <li
          className="tabmenu__menu-items"
          onClick={() => handleMenu("MyTrack")}
        >
          My track
        </li>
      </ul>
    </div>
  );
});
