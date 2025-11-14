import { Footer } from "@components/ui/footer/Footer";
import { useProfileStore } from "@store/profile/Profile.store";
import { TrackList } from "@components/ui/trackList/TrackList";
import { playerStore } from "@store/player/Player.store";
import { observer } from "mobx-react-lite";
import { Button } from "@components/ui/button/Button";
import "./ProfileLayout.css";
import { useRef } from "react";

export const ProfileLayout = observer(() => {
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        await useProfileStore.setImageUser(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCompose = async () => {
    await useProfileStore.requestCompose().then(async () => {
      await useProfileStore.getProfile();
    });
  };
  return (
    <>
      <div className="profile__container">
        <div className="profile__left">
          <input
            hidden
            type="file"
            ref={avatarRef}
            onChange={handleAvatarChange}
          />
          <img
            src={
              useProfileStore.user?.image
                ? `${useProfileStore.user.image}`
                : "/static/hero.png"
            }
            className="profile__img"
            alt="User img"
            onClick={() => avatarRef.current!.click()}
          />
          <span className="profile__name">
            {useProfileStore.user?.admin && (
              <span className="profile__prefix">[ADM] </span>
            )}
            {useProfileStore.user?.name}
          </span>
          <div className="profile__settings-container">
            {useProfileStore.user?.isAuthor ? (
              <Button className="profile__settings-btn">Upload music</Button>
            ) : (
              <Button className="profile__settings-btn" onClick={handleCompose}>
                {useProfileStore.user?.requestComposer
                  ? "Сancel the request "
                  : "Become a composer"}
              </Button>
            )}
          </div>
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
