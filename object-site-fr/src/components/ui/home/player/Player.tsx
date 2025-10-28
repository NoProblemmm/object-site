import { useEffect, useRef, useState } from "react";
import { playerStore } from "../../../../store/player/Player.store";
import "./Player.css";
import { observer } from "mobx-react-lite";

export const Player = observer(() => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack =
    playerStore.tracks.length > 0
      ? playerStore.tracks[playerStore.trackIndex]
      : null;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !isSeeking) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isSeeking, playerStore.trackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (playerStore.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerStore.isPlaying, playerStore.trackIndex]);

  const handleEnded = () => {
    playerStore.nextTrack();
    if (audioRef.current && playerStore.isPlaying && currentTrack) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      audioRef.current.play().catch((e) => {
        console.error("Ошибка воспроизведения:", e);
      });
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsSeeking(false);
    handleProgressChangeFromMouseEvent(e);
  };

  const handleProgressChangeFromMouseEvent = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    const newTime = parseFloat(e.currentTarget.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    playerStore.changeVolume(newVolume);
  };

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const newTime = Math.round((clickX / width) * duration);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;

      const newTime = Math.round((clickX / width) * duration);

      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
      setCurrentTime(newTime);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!currentTrack) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <audio ref={audioRef} src={currentTrack.url} onEnded={handleEnded} />

      <div className="cover__container">
        <img src={currentTrack.image} alt="Cover Image" className="cover" />
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
        <input
          type="range"
          min={0}
          max={100}
          value={playerStore.volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </>
  );
});
