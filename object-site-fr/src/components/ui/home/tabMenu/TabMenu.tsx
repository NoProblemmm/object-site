import { playerStore } from "../../../../store/player/Player.store";
import "./TabMenu.css";

export const TabMenu = () => {
  const handleMenu = (item: string) => {
    playerStore.menuPage(item);
  };
  return (
    <div className="tabmenu__container">
      <ul className="tabmenu__menu">
        <li
          className="tabmenu__menu-items"
          onClick={() => handleMenu("NextTrack")}
        >
          NextTrack
        </li>
        <li
          className="tabmenu__menu-items"
          onClick={() => handleMenu("MyTrack")}
        >
          MyTrack
        </li>
      </ul>
    </div>
  );
};
