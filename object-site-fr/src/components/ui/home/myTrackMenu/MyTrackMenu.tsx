import { playerStore } from "@store/player/Player.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import "./MyTrackMenu.css";
import { observer } from "mobx-react-lite";
export const MyTrackMenu = observer(() => {
  return (
    <div className="myTrackMenu__container">
      {playerStore.myTracks.map((item) => (
        <TrackList key={item.id} item={item} />
      ))}
    </div>
  );
});
