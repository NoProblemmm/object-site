import { useEffect, useState } from "react";
import { Input } from "@components/ui/input/Input";
import { useProfileStore } from "@store/profile/Profile.store";
import { socketService } from "@service/socket/Socket.service";
import { useSessionStore } from "@store/session/Session.store";
import type { ITrack } from "@store/player/Player.type";
import type { IUserInfo } from "@api/data-details";
import { ChatItems } from "./chatItems/ChatItems";
import "./TrackChat.css";

export interface IMessageType {
  sender: IUserInfo;
  message: string;
}

type Props = {
  currentTrack: ITrack | null;
};

export const TrackChat = ({ currentTrack }: Props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessageType[]>([]);

  useEffect(() => {
    const updateMessages = (newMessage: IMessageType) => {
      setMessages((prev) => [...prev, newMessage]);
    };
    if (currentTrack) {
      socketService.joinRoom(currentTrack.id);
      socketService.messageListener(updateMessages);
    }

    return () => {
      socketService.removeListeners();
    };
  }, [currentTrack]);

  const handleSendMessage = () => {
    if (currentTrack && message.trim() !== "") {
      socketService.sendMessage(
        currentTrack.id,
        useProfileStore.user!,
        message
      );
      setMessage("");
    }
  };

  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      if (currentTrack && message.trim() !== "") {
        socketService.sendMessage(
          currentTrack.id,
          useProfileStore.user!,
          message
        );
        setMessage("");
      }
    }
  };

  return (
    <div className="chat__container">
      <div className="chat__items-container">
        {messages.map((item, index) => (
          <ChatItems
            key={index}
            myMessage={item.sender.name === useProfileStore.user?.name}
            message={item}
          />
        ))}
      </div>
      {useSessionStore.isAutentificate ? (
        <>
          <div className="chat__input-container">
            <Input
              className="chat_input"
              value={message}
              onKeyDown={handleEnterDown}
              onChange={(e) => setMessage(e.target.value)}
            />
            <img
              className="chat__sendMessage"
              src="/static/player/unshuffle.svg"
              alt="Отправить сообщение"
              onClick={handleSendMessage}
            />
          </div>
        </>
      ) : (
        <div>Complete authorization or authentication!</div>
      )}
    </div>
  );
};
