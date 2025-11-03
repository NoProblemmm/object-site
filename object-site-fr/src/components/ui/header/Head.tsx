import { LoadingStyles } from "./scripts/LoadingStyles";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import "./Head.css";

interface ILink {
  name: string;
  link: string;
  callback?: () => Promise<void>;
}

type TLink = {
  links: Array<ILink>;
};

export const Header = ({ links }: TLink) => {
  const navigate = useNavigate();
  useEffect(() => {
    LoadingStyles();
  });

  return (
    <nav className="navigate">
      <span className="navigate__logo">next track</span>
      <ul>
        <li className="navigate__item">
          {links.map((link, index) => (
            <a
              key={index}
              className="navigate__link"
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
    </nav>
  );
};
