import { Socket as SocketIO } from "socket.io-client";
import type { IUserInfo } from "@api/data-details";

export type TSocket = SocketIO;

export interface ISocketService {
  setupSocket(): TSocket | null;
  isConnected(): boolean;
  connect(): Promise<void>;
  joinRoom(volume: number): void;
  sendMessage(trackId: number, sender: IUserInfo, message: string): void;
  messageListener(callback: (data: any) => void): void;
  removeListeners(): void;
  getConnectionStatus(): boolean;
}
