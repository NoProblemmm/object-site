import { useNavigate } from "@tanstack/react-router";
import { ThemeContext } from "@theme/ThemeContext";
import { useContext, useState } from "react";

export const SettingsLogic = () => {
  const [themeMenu, setThemeMenu] = useState(false);
  const [localesMenu, setLocalesMenu] = useState(false);
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const links = [
    {
      name: "Theme",
      state: themeMenu,
      open: () => {
        setThemeMenu(!themeMenu);
      },
      sublinks: [
        {
          name: theme.id === "dark_theme" ? "Light" : "Dark",
          callback: toggleTheme,
        },
      ],
    },
    {
      name: "Language",
      state: localesMenu,
      open: () => {
        setLocalesMenu(!localesMenu);
      },
      sublinks: [
        {
          name: "Russian",
          callback: () => {},
        },
        { name: "English", callback: () => {} },
      ],
    },
    {
      name: "Reset password",
      state: localesMenu,
      open: () => {
        navigate({ to: "/auth/resetPassword" });
      },
    },
  ];
  return { links };
};
