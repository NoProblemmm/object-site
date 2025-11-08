import { useState } from "react";

export const SettingsLogic = () => {
  const [themeMenu, setThemeMenu] = useState(false);
  const [localesMenu, setLocalesMenu] = useState(false);

  const links = [
    {
      name: "Theme",
      state: themeMenu,
      open: () => {
        setThemeMenu(!themeMenu);
      },
      sublinks: [
        {
          name: "Dark",
          callback: () => {},
        },
        { name: "Light", callback: () => {} },
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
