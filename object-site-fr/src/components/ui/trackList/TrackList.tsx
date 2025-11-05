import React from "react";
import { useEffect, useRef, useState } from "react";
import { playerStore } from "@store/player/Player.store";
import type { ITrack } from "@store/player/Player.type";
import "./TrackList.css";

type TProps = {
  item: ITrack;
};
export const TrackList = React.memo(({ item }: TProps) => {
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
    const selectTrack = playerStore.myTracks.findIndex(
      (track) => track.id === item.id
    );
    playerStore.playMyTrack(selectTrack);
    playerStore.menuPage("Player");
  };
  const handelDeleteTrack = async (trackId: number) => {
    await playerStore.deleteMyTrack(trackId);
  };

  return (
    <div key={item.id} className="card__container-sider">
      <img
        src={item.image}
        alt="Track"
        className="card__image"
        onClick={() => handelSelectTrack(item)}
      />
      <div className="card__title-container">
        <span className="card__title">{item.name}</span>
        <span className="card__author">{item.author}</span>
      </div>
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
  );
});
