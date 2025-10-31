import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { playerStore } from "../../../store/player/Player.store";
import type { ITrack } from "../../../store/player/Player.type";
import "./LeftSider.css";

export const LeftSider = observer(() => {
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

  const handelMenuTrack = (id: number) => {
    setTrackMenu(id === trackMenu ? undefined : id);
  };

  document.addEventListener(
    "click",
    (event) => {
      const targetEl = event.target as HTMLElement;
      const isClickInsideMenu =
        targetEl.closest(".track__menu") ||
        targetEl.classList.contains("card__image");

      if (!isClickInsideMenu) {
        setTrackMenu(undefined);
      }
    },
    false
  );

  const handelSelectTrack = (item: ITrack) => {
    const selectTrack = playerStore.tracks.findIndex(
      (track) => track.id === item.id
    );
    playerStore.selectTrack(selectTrack);
  };

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

  const handelDeleteTrack = async (trackId: number) => {
    await playerStore.deleteMyTrack(trackId);
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
          <div key={item.id} className="card__container-sider">
            <img
              src={item.image}
              alt="Track"
              className="card__image"
              onClick={() => handelSelectTrack(item)}
            />
            <span className="card__title">{item.name}</span>

            {trackMenu === item.id ? (
              <div className="track__menu">
                <ul>
                  <li onClick={() => handelDeleteTrack(item.id)}>Delete</li>
                </ul>
              </div>
            ) : (
              <p className="card__subtitle_time">{item.time}</p>
            )}

            <img
              key={item.id}
              onClick={() => handelMenuTrack(item.id)}
              src="/static/player/three-dots.svg"
              alt="Track"
              className={`card__image ${trackMenu === item.id ? "three__dots-img" : ""}`}
            />
          </div>
        ))}
      </div>
    </>
  );
});
