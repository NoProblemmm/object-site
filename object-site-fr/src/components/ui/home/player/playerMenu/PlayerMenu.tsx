import { observer } from "mobx-react-lite";
import { playerStore } from "@store/player/Player.store";
import { useSessionStore } from "@store/session/Session.store";
import { PlayerLogic } from "../hooks/PlayerLogic";
import "./PlayerMenu.css";

export const PlayerMenu = observer(() => {
  const { currentTrack, handleAddTrack, handleDeleteTrack } = PlayerLogic();

  return (
    <div className="menu__container">
      {useSessionStore.isAutentificate &&
      playerStore.myTracks &&
      playerStore.myTracks.find((track) => track.id === currentTrack?.id) ? (
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
        className={`control mix__item ${playerStore.isShuffle && "active"}`}
        src={
          playerStore.isShuffle
            ? "/static/player/unshuffle.svg"
            : "/static/player/shuffle.svg"
        }
        alt="mixItemAdd"
        onClick={() => playerStore.toggleShuffleTrack()}
      />
    </div>
  );
});
