import { LoadingStyles } from "./scripts/LoadingStyles";
import { useEffect } from "react";
import "./Head.css";

export const Head = () => {
  useEffect(() => {
    LoadingStyles();
  });
  return (
    <nav className="navigate">
      <span className="navigate__logo">next play</span>
      <ul>
        <li className="navigate__item">
          <a className="navigate__link">Music</a>
          <a className="navigate__link">Sign In / Sign Up</a>
        </li>
      </ul>
    </nav>
  );
};
