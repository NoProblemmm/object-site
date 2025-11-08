import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Input } from "@components/ui/input/Input";
import { playerStore } from "@store/player/Player.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import "./RightSider.css";
export const RightSider: React.FC = observer(() => {
  const [isSiderMenu, setIsSiderMenu] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const hendalSearch = async () => {
    await playerStore.searchTrack(inputValue);
  };

  return !isSiderMenu ? (
    <>
      <div className="sider__container">
        <img
          className="sider__closed"
          src="/static/rightSider/stick_rl.svg"
          alt="stick"
          onClick={() => setIsSiderMenu(!isSiderMenu)}
        />
      </div>
    </>
  ) : (
    <div className={`sider__container ${isSiderMenu && "active"}`}>
      <div className="rightsider__navigate">
        <img
          className="sider__closed active"
          src="/static/rightSider/stick_rl.svg"
          alt="stick"
          onClick={() => setIsSiderMenu(!isSiderMenu)}
        />
        <div className="rightsider__input-container">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search track..."
            className="rightsider__input"
          />
          <img
            className="rightsider__search"
            src="/static/rightSider/search.svg"
            alt="Search"
            onClick={() => hendalSearch()}
          />
        </div>
      </div>
      {playerStore.searchTracks &&
        playerStore.searchTracks.map((item) => (
          <TrackList key={item.id} item={item} search={true} />
        ))}
    </div>
  );
});
