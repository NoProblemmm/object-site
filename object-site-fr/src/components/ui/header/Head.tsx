import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSessionStore } from "@store/session/Session.store";
import { useProfileStore } from "@store/profile/Profile.store";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { LoadingStyles } from "./scripts/LoadingStyles";
import "./Head.css";

interface ILink {
  name: string;
  link: string;
  callback?: () => Promise<void>;
}

type TLink = {
  links: Array<ILink>;
  style?: string;
};

export const Header = observer(({ links, style }: TLink) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    LoadingStyles();
  }, []);

  useClickOutside({
    ref: menuRef,
    callback: () => setOpenMenu(false),
  });

  return (
    <>
      <nav className="navigate ">
        <span
          className={`navigate__logo ${style}`}
          onClick={() => navigate({ to: "/" })}
        >
          next track
        </span>
        {useSessionStore.isAutentificate ? (
          <div className="navigate__profile-container">
            <div
              className={`navigate__profile-name ${style} ${useProfileStore.user?.admin && "navigate__name-prefix"}`}
            >
              {useProfileStore.user?.name}
            </div>
            <div
              ref={menuRef}
              className="navigate__profile "
              onClick={() => setOpenMenu(!openMenu)}
            >
              <img
                src={
                  useProfileStore.user?.image
                    ? `${useProfileStore.user.image}`
                    : "/static/hero.png"
                }
                alt="profileImg"
                className="navigate__profile-menu"
              />
            </div>
          </div>
        ) : (
          <ul>
            <li className={`navigate__item ${style}`}>
              {links.map((link, index) => (
                <a
                  key={index}
                  className={`navigate__link ${style}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.callback) {
                      link.callback();
                      navigate({ to: link.link });
                    } else if (link.link) {
                      navigate({ to: link.link });
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </li>
          </ul>
        )}
        <nav className={`dropMenu ${openMenu && "active"}`}>
          <ul className="dropMenu__list">
            {links.map((link, index) => (
              <li
                key={index}
                className="dropMenu__item"
                onClick={(e) => {
                  e.preventDefault();
                  if (link.callback) {
                    link.callback();
                    navigate({ to: link.link });
                  } else if (link.link) {
                    navigate({ to: link.link });
                  }
                }}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </nav>
      </nav>
    </>
  );
});
