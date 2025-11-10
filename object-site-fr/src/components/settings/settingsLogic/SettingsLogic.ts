import { ThemeContext } from "@theme/ThemeContext";
import { useContext, useState } from "react";

export const SettingsLogic = () => {
  const [themeMenu, setThemeMenu] = useState(false);
  const [localesMenu, setLocalesMenu] = useState(false);
  const { toggleTheme } = useContext(ThemeContext);
  const { theme } = useContext(ThemeContext);

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
  ];
  return { links };
};
