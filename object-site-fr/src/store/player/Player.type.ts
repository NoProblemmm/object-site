export interface IPlayerStates extends IPlayerState, IPlayerMethods {}

export interface ITrack {
  id: number;
  name: string;
  author: string;
  time: string;
  url: string;
  image?: string;
}

export interface IPlayerStore extends IPlayerState, IPlayerMethods {}

export interface IPlayerState {
  isPlaying: boolean;
  isShuffle: boolean;
  volume: number;
  trackIndex: number;
  myTrackIndex: number;
  searchTrackIndex: number;
  tracks: ITrack[];
  myTracks: ITrack[];
  searchTracks: ITrack[];
}

export interface IPlayerMethods {
  getTrackStore(): void;
  getMyTrack(): void;
  toggleShuffleTrack(): void;
  shuffleTrack(): void;
  searchTrack(volume: string): void;
  addMyTrack(volume: number): void;
  deleteMyTrack(volume: number): void;
  selectTrack(volume: number): void;
  menuPage(volume: string): void;
  playTrack(volume: number): void;
  playMyTrack(volume: number): void;
  playSearchTrack(volume: number): void;
  togglePlayPause(): void;
  changeVolume(volume: number): void;
  nextTrack(): void;
  previousTrack(): void;
  seekTo(time: number): void;
}
export enum TrackState {
  Wind = "Wind",
  Favorite = "Favorite",
  SearchTrack = "SearchTrack",
}
