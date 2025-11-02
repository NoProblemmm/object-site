import { playerStore } from "../../../../store/player/Player.store";
import { TrackList } from "../../trackList/TrackList";
import "./MyTrackMenu.css";
export const MyTrackMenu = () => {
  return (
    <div className="myTrackMenu__container">
      {playerStore.myTracks.map((item) => (
        <TrackList key={item.id} item={item} />
      ))}
    </div>
  );
};
