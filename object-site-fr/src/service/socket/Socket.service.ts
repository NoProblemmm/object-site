import { SOCKET_URL } from "@api/Api.service";
import { useApiTokenProvider } from "@api/ApiToken.provider";
import { io } from "socket.io-client";
import type { ISocketService, TSocket } from "./Socket.types";
import type { IUserInfo } from "@api/data-details";

export class SocketService implements ISocketService {
  private _socket: TSocket | null = null;

  constructor() {}

  setupSocket = () => {
    if (!this._socket) {
      this._socket = io(SOCKET_URL, {
        auth: {
          token: useApiTokenProvider.accessToken,
        },
        transports: ["websocket"],
      });
    }
    return this._socket;
  };

  isConnected = () => {
    return !!this._socket && this._socket.connected;
  };

  connect = async () => {
    await this.setupSocket().connect();
  };

  joinRoom = (roomId: number) => {
    this.setupSocket()?.emit("joinRoom", roomId);
  };

  sendMessage = (trackId: number, sender: IUserInfo, message: string) => {
    this.setupSocket()?.emit("sendMessage", {
      trackId,
      sender,
      message,
    });
  };

  messageListener = (callback: (data: any) => void) => {
    this.setupSocket()?.on("message", callback);
  };

  removeListeners = () => {
    this.setupSocket()?.off("message");
    this.setupSocket()?.off("connect");
    this.setupSocket()?.off("disconnect");
  };

  getConnectionStatus = () => {
    return this.isConnected();
  };
}

export const socketService = new SocketService();
