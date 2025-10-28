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
  volume: number;
  trackIndex: number;
  tracks: ITrack[];
}

export interface IPlayerMethods {
  togglePlayPause(): void;
  changeVolume(volume: number): void;
  nextTrack(): void;
  previousTrack(): void;
  seekTo(time: number): void;
}
