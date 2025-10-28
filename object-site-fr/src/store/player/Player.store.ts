import { makeAutoObservable, runInAction } from "mobx";
import { type IPlayerStates, type ITrack } from "./Player.type";
import { Api } from "../../api/Api";

export class PlayerStore implements IPlayerStates {
  isPlaying = false;
  volume = 50;
  trackIndex = 0;
  tracks: ITrack[] = [];
  myTracks: ITrack[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getTrackStore = async () => {
    const response = await Api().getTrack();
    runInAction(() => {
      this.tracks = response as ITrack[];
    });
  };

  public getMyTrack = async () => {
    const response = await Api().getMyTrack();
    runInAction(() => {
      this.myTracks = response as ITrack[];
    });
  };

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  changeVolume(newVolume: any) {
    this.volume = newVolume;
  }

  public selectTrack(index: number) {
    this.trackIndex = index;
    this.isPlaying = true;
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
