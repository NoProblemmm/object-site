import { makeAutoObservable } from "mobx";
import { type IPlayerStates } from "./Player.type";

export class PlayerStore implements IPlayerStates {
  isPlaying = false;
  volume = 50;
  trackIndex = 0;
  tracks = [
    {
      name: "track-1",
      author: "Net",
      image: "/static/retro-design-1.jpg",
      url: "tracks/track-1.mp3",
    },
    {
      name: "track-2",
      author: "Secret",
      image: "/static/retro-design-2.jpg",
      url: "tracks/track-2.mp3",
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  changeVolume(newVolume: any) {
    this.volume = newVolume;
  }

  nextTrack() {
    this.trackIndex++;
    if (this.trackIndex >= this.tracks.length) {
      this.trackIndex = 0;
    }
  }

  previousTrack() {
    this.trackIndex--;
    if (this.trackIndex < 0) {
      this.trackIndex = this.tracks.length - 1;
    }
  }

  seekTo(time: any) {
    console.log("Перемотка на:", time);
  }
}

export const playerStore = new PlayerStore();
