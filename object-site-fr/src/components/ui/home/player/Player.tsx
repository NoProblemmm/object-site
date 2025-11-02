import { observer } from "mobx-react-lite";
import { PlayerLogic } from "./hooks/PlayerLogic";
import "./Player.css";

export const Player = observer(() => {
  const {
    audioRef,
    currentTime,
    currentTrack,
    duration,
    playerStore,
    isMute,
    isValue,
    handleMouseDown,
    handleEnded,
    handleMouseMove,
    handleMouseUp,
    handleProgressChange,
    handleVolumeChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleDragStart,
    setIsValue,
    setIsMute,
    handleDragEnd,
  } = PlayerLogic();

  if (!currentTrack) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={handleEnded}
        muted={isMute}
      />

      <div className="cover__container ">
        <div
          className={`cover img__container ${playerStore.isPlaying ? "cover__multi" : "img__static"}`}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <img
            src={currentTrack.image}
            alt="Cover Image"
            className="cover draggable "
          />
        </div>
      </div>
      <div className="name__compose">
        <h3 className="title">{currentTrack.name}</h3>
        <p className="subTitle">{currentTrack.author}</p>
      </div>

      <div className="progress-container">
        <div className="time-display__start">
          {Math.floor(currentTime / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, "0")}
        </div>
        <div className="time-display__end">
          {Math.floor(duration / 60)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}
        </div>
        <div
          className="slider-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <input
            type="range"
            min={0}
            max={Number.isFinite(duration) ? duration : 0}
            value={currentTime}
            onChange={handleProgressChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            className="progress-slider"
          />
        </div>
      </div>
      <div className="menu__container">
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
      </div>

      <div className="volume-container">
        <img
          src={`/static/player/${isMute ? "muted.svg" : "volume.svg"}`}
          className={`volume__image  ${isValue && "volume__image-isVolume "}`}
          alt="sd"
          onClick={() => setIsMute(!isMute)}
        />

        <input
          type="range"
          min={0}
          max={100}
          value={playerStore.volume}
          onChange={handleVolumeChange}
          onMouseDown={() => setIsValue(true)}
          onMouseUp={() => setIsValue(false)}
          className="volume-slider"
        />
      </div>
    </>
  );
});
