import { observer } from "mobx-react-lite";
import { playerStore } from "../../../store/player/Player.store";
import "./LeftSider.css";
import { useEffect, useRef, useState } from "react";
import type { ITrack } from "../../../store/player/Player.type";

export const LeftSider = observer(() => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [trackMenu, setTrackMenu] = useState<number | undefined>();

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

  const handelSelectTrack = (item: ITrack) => {
    const selectTrack = playerStore.myTracks.findIndex(
      (track) => track.id === item.id
    );
    playerStore.selectTrack(selectTrack);
  };
  return (
    <>
      <div className="container-sider">
        <audio
          ref={audioRef}
          src={playerStore.myTracks[playerStore.trackIndex]?.url}
        ></audio>
        {playerStore.myTracks.map((item) => (
          <div key={item.id} className="card__containerst">
            <img
              src={item.image}
              alt="Track"
              className="card__image"
              onClick={() => handelSelectTrack(item)}
            />
            <span className="card__title">{item.name}</span>

            <p className="card__subtitle_time">{item.time}</p>
            <img
              key={item.id}
              onClick={() => handelMenuTrack(item.id)}
              src="/static/player/three-dots.svg"
              alt="Track"
              className={`card__image ${trackMenu === item.id ? "three__dots-img" : ""}`}
            />
            <div className="track__menu">
              <ul>
                <li>Delete</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});
