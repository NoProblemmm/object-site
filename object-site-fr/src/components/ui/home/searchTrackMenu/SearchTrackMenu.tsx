import { useState } from "react";
import { observer } from "mobx-react-lite";
import { playerStore } from "@store/player/Player.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import { Input } from "@components/ui/input/Input";
import "./SearchTrackMenu.css";
export const SearchTrackMenu = observer(() => {
  const [inputValue, setInputValue] = useState("");

  const hendalSearch = async () => {
    await playerStore.searchTrack(inputValue);
  };
  return (
    <div className="searchTrack_container">
      <div className="rightsider__input-container">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search track..."
          className="search__input"
        />
        <img
          className="rightsider__search"
          src="/static/rightSider/search.svg"
          alt="Search"
          onClick={() => hendalSearch()}
        />
      </div>
      {playerStore.searchTracks.map((item) => (
        <TrackList key={item.id} item={item} search={true} />
      ))}
    </div>
  );
});
