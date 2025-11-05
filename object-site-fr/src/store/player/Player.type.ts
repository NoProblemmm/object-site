export interface IPlayerStates extends IPlayerState, IPlayerMethods {}

export interface ITrack {
  id: number;
  name: string;
  author: string;
  time: string;
  url: string;
  image?: string;
}

export interface IPlayerState {
  isPlaying: boolean;
  isMyTrack: boolean;
  volume: number;
  trackIndex: number;
  tracks: ITrack[];
  myTracks: ITrack[];
}

export interface IPlayerMethods {
  getTrackStore(): void;
  getMyTrack(): void;
  addMyTrack(volume: number): void;
  deleteMyTrack(volume: number): void;
  selectTrack(volume: number): void;
  menuPage(volume: string): void;
  playTrack(volume: number): void;
  playMyTrack(volume: number): void;
  togglePlayPause(): void;
  changeVolume(volume: number): void;
  nextTrack(): void;
  previousTrack(): void;
  seekTo(time: number): void;
}
