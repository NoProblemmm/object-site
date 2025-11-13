import { Footer } from "@components/ui/footer/Footer";
import { useProfileStore } from "@store/profile/Profile.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import { playerStore } from "@store/player/Player.store";
import { observer } from "mobx-react-lite";
import "./ProfileLayout.css";

export const ProfileLayout = observer(() => {
  return (
    <>
      <div className="profile__container">
        <div className="profile__left">
          <img
            src={
              useProfileStore.user?.image
                ? `${useProfileStore.user.image}`
                : "/static/hero.png"
            }
            className="profile__img"
            alt="User img"
          />
          <span className="profile__name">{useProfileStore.user?.name}</span>
        </div>
        <div className="profile__right">
          <span className="profile__span-mytrack">My Track</span>
          {playerStore.myTracks &&
            playerStore.myTracks.map((item) => (
              <TrackList key={item.id} item={item} search={false} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
});
