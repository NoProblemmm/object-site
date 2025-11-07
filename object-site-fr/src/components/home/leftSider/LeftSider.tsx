import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { playerStore } from "@store/player/Player.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import "./LeftSider.css";

export const LeftSider: React.FC = observer(() => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [trackMenu, setTrackMenu] = useState<number | undefined>();
  const [isHighlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleDragStart = () => {
      setHighlighted(true);
    };

    const handleDragEnd = () => {
      setHighlighted(false);
    };

    document.addEventListener("drag-start", handleDragStart);
    document.addEventListener("drag-end", handleDragEnd);
    setHighlighted(false);
    return () => {
      document.removeEventListener("drag-start", handleDragStart);
      document.removeEventListener("drag-end", handleDragEnd);
      setHighlighted(false);
    };
  }, []);

  const handleDrop = async (e: any) => {
    e.preventDefault();
    const droppedTrackData = e.dataTransfer.getData("text/plain");
    const track = JSON.parse(droppedTrackData);
    setHighlighted(false);
    await playerStore.addMyTrack(track.id);
  };

  return (
    <>
      <div
        className={`container-sider ${isHighlighted && "container-sider__draggable"}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <audio
          ref={audioRef}
          src={playerStore.myTracks[playerStore.trackIndex]?.url}
        ></audio>
        {playerStore.myTracks.map((item) => (
          <TrackList key={item.id} item={item} search={false} />
        ))}
      </div>
    </>
  );
});
