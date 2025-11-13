import { useProfileStore } from "@store/profile/Profile.store";
import "./ChatItems.css";
import type { IMessageType } from "../TrackChat";

type Props = {
  myMessage: boolean;
  message: IMessageType;
};

export const ChatItems = ({ myMessage, message }: Props) => {
  return myMessage ? (
    <>
      <div className="chatitems__container">
        <div className="chatitems__container-message">
          <span className="chatitems__message-name">You</span>
          <span className="chatitems__message">{message.message}</span>
        </div>
        <img
          className="chatitems__myimage"
          src={`
          ${useProfileStore.user?.image ? useProfileStore.user?.image : "/static/hero.png"}`}
          alt="Img user"
        />
      </div>
    </>
  ) : (
    <div className="chatitems__container">
      <img
        className="chatitems__image"
        src={`${message.sender.image ? message.sender.image : `/static/hero.png`}`}
        alt="Img user"
      />
      <div className="chatitems__container-message">
        <span className="chatitems__message-name">{message.sender.name}</span>
        <span className="chatitems__message">{message.message}</span>
      </div>
    </div>
  );
};
