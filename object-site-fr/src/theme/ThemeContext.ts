import React from "react";
import { DARK_THEME } from "./variants/dark";
import type { IThemeContext } from "./ThemeTypes";

export const ThemeContext = React.createContext<IThemeContext>({
  theme: DARK_THEME,
  toggleTheme: () => {
    console.log("Theme is not render!");
  },
  isDark: true,
  isLight: false,
});
