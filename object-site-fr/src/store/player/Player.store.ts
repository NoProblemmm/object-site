import { makeAutoObservable, runInAction } from "mobx";
import { TrackState, type IPlayerStore, type ITrack } from "./Player.type";
import { Api } from "@api/Api";

export class PlayerStore implements IPlayerStore {
  submenu = "Player";
  currentTrackSource: TrackState = TrackState.Wind;
  isPlaying = false;
  isMyTrack = false;
  volume = 50;
  trackIndex = 0;
  myTrackIndex = 0;
  searchTrackIndex = 0;
  tracks: ITrack[] = [];
  myTracks: ITrack[] = [];
  searchTracks: ITrack[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentTrackSource(source: TrackState) {
    this.currentTrackSource = source;
  }

  public getTrackStore = async () => {
    const response = await Api().getTrack();
    runInAction(() => {
      this.tracks = response as ITrack[];
    });
  };

  public searchTrack = async (name: string) => {
    const response = await Api().searchTrack(name);
    runInAction(() => {
      this.searchTracks = response as ITrack[];
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
    switch (this.currentTrackSource) {
      case TrackState.Wind:
        this.trackIndex = index;
        this.isPlaying = true;
        break;
      case TrackState.Favorite:
        this.myTrackIndex = index;
        this.isPlaying = true;
        break;
      case TrackState.SearchTrack:
        this.searchTrackIndex = index;
        this.isPlaying = true;
        break;
    }
  }

  public playTrack = (index: number) => {
    this.currentTrackSource = TrackState.Wind;
    this.selectTrack(index);
  };

  public playMyTrack = (index: number) => {
    this.currentTrackSource = TrackState.Favorite;
    this.selectTrack(index);
  };

  public playSearchTrack = (index: number) => {
    this.currentTrackSource = TrackState.SearchTrack;
    this.selectTrack(index);
  };

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  changeVolume(newVolume: any) {
    this.volume = newVolume;
  }

  nextTrack() {
    switch (this.currentTrackSource) {
      case TrackState.Wind:
        this.trackIndex++;
        if (this.trackIndex >= this.tracks.length) {
          this.trackIndex = 0;
        }
        break;
      case TrackState.Favorite:
        this.myTrackIndex++;
        if (this.myTrackIndex >= this.myTracks.length) {
          this.myTrackIndex = 0;
        }
        break;
      case TrackState.SearchTrack:
        this.searchTrackIndex++;
        if (this.searchTrackIndex >= this.searchTracks.length) {
          this.searchTrackIndex = 0;
        }
        break;
    }
  }

  previousTrack() {
    switch (this.currentTrackSource) {
      case TrackState.Wind:
        this.trackIndex--;
        if (this.trackIndex < 0) {
          this.trackIndex = this.tracks.length - 1;
        }
        break;
      case TrackState.Favorite:
        this.myTrackIndex--;
        if (this.myTrackIndex < 0) {
          this.myTrackIndex = this.myTracks.length - 1;
        }
        break;
      case TrackState.SearchTrack:
        this.searchTrackIndex--;
        if (this.searchTrackIndex < 0) {
          this.searchTrackIndex = this.searchTracks.length - 1;
        }
        break;
    }
  }

  seekTo(time: any) {
    console.log("Перемотка на:", time);
  }
}

export const playerStore = new PlayerStore();
