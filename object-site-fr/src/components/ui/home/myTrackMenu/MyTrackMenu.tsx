import { playerStore } from "@store/player/Player.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import { observer } from "mobx-react-lite";
import "./MyTrackMenu.css";
export const MyTrackMenu = observer(() => {
  return (
    <div className="myTrackMenu__container">
      {playerStore.myTracks.map((item) => (
        <TrackList key={item.id} item={item} />
      ))}
    </div>
  );
});
