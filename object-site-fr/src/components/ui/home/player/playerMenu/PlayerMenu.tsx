import { playerStore } from "@store/player/Player.store";
import { PlayerLogic } from "../hooks/PlayerLogic";
import "./PlayerMenu.css";
import { observer } from "mobx-react-lite";
export const PlayerMenu = observer(() => {
  const { currentTrack } = PlayerLogic();

  const handleAddTrack = async (trackId?: number) => {
    if (!trackId) return console.log("Трек не найден");
    await playerStore.addMyTrack(trackId);
  };
  const handleDeleteTrack = async (trackId?: number) => {
    if (!trackId) return console.log("Трек не найден");
    await playerStore.deleteMyTrack(trackId);
  };
  return (
    <div className="menu__container">
      {playerStore.myTracks.find((track) => track.id === currentTrack?.id) ? (
        <img
          className="control add__item"
          src="/static/player/check.svg"
          alt="addItemImg"
          onClick={() => handleDeleteTrack(currentTrack?.id)}
        />
      ) : (
        <img
          className="control add__item"
          src="/static/player/add.svg"
          alt="addItemImg"
          onClick={() => handleAddTrack(currentTrack?.id)}
        />
      )}
      <img
        src="/static/player/player-seek.svg"
        alt="Image Left"
        className="control left-control"
        onClick={() => playerStore.previousTrack()}
      />
      <img
        src={
          playerStore.isPlaying
            ? "/static/player/pause.svg"
            : "/static/player/play.svg"
        }
        alt="Image Left"
        className="control"
        onClick={() => playerStore.togglePlayPause()}
      />

      <img
        src="/static/player/player-seek.svg"
        alt="Image Right"
        className="control right-control"
        onClick={() => playerStore.nextTrack()}
      />
      <img
        className="control mix__item"
        src="/static/player/double.svg"
        alt="mixItemAdd"
      />
    </div>
  );
});
