import { makeAutoObservable, runInAction } from "mobx";
import { type IPlayerStates, type ITrack } from "./Player.type";
import { Api } from "@api/Api";

export class PlayerStore implements IPlayerStates {
  submenu = "Player";
  isPlaying = false;
  isMyTrack = false;
  volume = 50;
  trackIndex = 0;
  myTrackIndex = 0;
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
  public addMyTrack = async (trackId: number) => {
    await Api()
      .addMyTrack(trackId)
      .then(async () => {
        await this.getMyTrack();
      });
  };
  public deleteMyTrack = async (trackId: number) => {
    await Api()
      .deleteMyTrack(trackId)
      .then(async () => {
        await this.getMyTrack();
      });
  };

  public menuPage = (page: string) => {
    this.submenu = page;
  };

  public selectTrack(index: number) {
    if (this.isMyTrack) {
      this.myTrackIndex = index;
      this.isPlaying = true;
    } else {
      this.trackIndex = index;
      this.isPlaying = true;
    }
  }

  public playTrack = (index: number) => {
    this.isMyTrack = false;
    this.selectTrack(index);
  };

  public playMyTrack = (index: number) => {
    this.isMyTrack = true;
    this.selectTrack(index);
  };

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  changeVolume(newVolume: any) {
    this.volume = newVolume;
  }

  nextTrack() {
    if (this.isMyTrack) {
      this.myTrackIndex++;
      if (this.myTrackIndex >= this.myTracks.length) {
        this.myTrackIndex = 0;
      }
    } else {
      this.trackIndex++;
      if (this.trackIndex >= this.tracks.length) {
        this.trackIndex = 0;
      }
    }
  }

  previousTrack() {
    if (this.isMyTrack) {
      this.myTrackIndex--;
      if (this.myTrackIndex < 0) {
        this.myTrackIndex = this.myTracks.length - 1;
      }
    }
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
