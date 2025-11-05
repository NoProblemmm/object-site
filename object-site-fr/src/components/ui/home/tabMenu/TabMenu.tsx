import { playerStore } from "@store/player/Player.store";
import "./TabMenu.css";
import { observer } from "mobx-react-lite";

export const TabMenu = observer(() => {
  const handleMenu = (item: string) => {
    playerStore.menuPage(item);
  };
  return (
    <div className="tabmenu__container">
      <ul className="tabmenu__menu">
        {playerStore.isMyTrack && (
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
