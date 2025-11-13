import { useEffect, useState, useRef } from "react";
import { playerStore } from "@store/player/Player.store";
import { TrackState } from "@store/player/Player.type";

export const PlayerLogic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack =
    playerStore.currentTrackSource === TrackState.Favorite
      ? playerStore.myTracks.length > 0
        ? playerStore.myTracks[playerStore.myTrackIndex]
        : null
      : playerStore.currentTrackSource === TrackState.SearchTrack
        ? playerStore.searchTracks.length > 0
          ? playerStore.searchTracks[playerStore.searchTrackIndex]
          : null
        : playerStore.tracks.length > 0
          ? playerStore.tracks[playerStore.trackIndex]
          : null;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !isSeeking) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [
    isSeeking,
    playerStore.trackIndex,
    playerStore.myTrackIndex,
    playerStore.searchTrackIndex,
  ]);

  useEffect(() => {
    if (audioRef.current) {
      if (playerStore.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [
    playerStore.isPlaying,
    playerStore.trackIndex,
    playerStore.myTrackIndex,
    playerStore.searchTrackIndex,
  ]);

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (playerStore.isPlaying) {
      playerStore.togglePlayPause();
    }
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
    if (!playerStore.isPlaying) {
      playerStore.togglePlayPause();
    }
  };

  const handleDragStart = (e: any) => {
    const imageSrc = e.target.src || e.target.dataset.imageUrl;
    const img = new Image();
    img.src = imageSrc;

    e.dataTransfer.setDragImage(
      img,
      img.naturalWidth / 2,
      img.naturalHeight / 2
    );
    e.dataTransfer.setData("text/plain", JSON.stringify(currentTrack));
    document.dispatchEvent(new CustomEvent("drag-start"));
    e.dr;
  };

  const handleDragEnd = () => {
    document.dispatchEvent(new CustomEvent("drag-end"));
  };

  const handleAddTrack = async (trackId?: number) => {
    if (!trackId) return console.log("Трек не найден");
    await playerStore.addMyTrack(trackId);
  };
  const handleDeleteTrack = async (trackId?: number) => {
    if (!trackId) return console.log("Трек не найден");
    await playerStore.deleteMyTrack(trackId);
  };

  const handleOpenChat = () => {
    setOpenChat(!openChat);
  };

  return {
    audioRef,
    currentTime,
    currentTrack,
    duration,
    playerStore,
    isMute,
    isValue,
    openChat,
    handleAddTrack,
    handleDeleteTrack,
    handleMouseDown,
    handleDragStart,
    handleDragEnd,
    handleEnded,
    setIsValue,
    setIsMute,
    handleMouseMove,
    handleMouseUp,
    handleProgressChange,
    handleProgressChangeFromMouseEvent,
    handleVolumeChange,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleOpenChat,
  };
};
