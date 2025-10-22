export interface IPlayerStates extends IPlayerState, IPlayerMethods {}

export interface IPlayerState {
  isPlaying: boolean;
  volume: number;
  trackIndex: number;
  tracks: Array<object>;
}

export interface IPlayerMethods {
  togglePlayPause(): void;
  changeVolume(volume: number): void;
  nextTrack(): void;
  previousTrack(): void;
  seekTo(time: number): void;
}
