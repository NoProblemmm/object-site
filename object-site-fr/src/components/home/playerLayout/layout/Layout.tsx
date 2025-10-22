import { observer } from "mobx-react-lite";
import { Player } from "../../../ui/home/player/Player";
import "./Layout.css";

export const Layout = observer(() => {
  return (
    <>
      <div className="container">
        <div className="card__container">
          <Player />
        </div>
      </div>
    </>
  );
});
