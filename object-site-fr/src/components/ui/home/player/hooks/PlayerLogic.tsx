import { useEffect, useState, useRef } from "react";
import { playerStore } from "../../../../../store/player/Player.store";

export const PlayerLogic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = playerStore.tracks[playerStore.trackIndex];

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const setTime = () => {
    if (audioRef.current && !isSeeking) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const loadTrack = () => {
    if (audioRef.current) {
      if (playerStore.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  const handleEnded = () => {
    playerStore.nextTrack();
    if (audioRef.current && playerStore.isPlaying) {
      audioRef.current.play().catch((e) => {
        console.log("Ошибка воспроизведения:", e);
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

  return {
    audioRef,
    currentTime,
    currentTrack,
    duration,
    playerStore,
    setTime,
    loadTrack,
    handleMouseDown,
    handleEnded,
    handleMouseMove,
    handleMouseUp,
    handleProgressChange,
    handleProgressChangeFromMouseEvent,
    handleVolumeChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
  };
};
