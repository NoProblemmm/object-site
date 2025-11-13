import React, { useCallback, useMemo } from "react";
import { type PropsWithChildren, useState } from "react";
import { DARK_THEME, DARK_THEME_ID } from "./variants/dark";
import { ThemeContext } from "./ThemeContext";
import type { ITheme, IThemeContext } from "./ThemeTypes";
import { LIGHT_THEME, LIGHT_THEME_ID } from "./variants/light";

export const ThemeProvider = React.memo<PropsWithChildren>((props) => {
  const [theme, setTheme] = useState<ITheme>(
    localStorage.getItem("theme") === DARK_THEME_ID ? DARK_THEME : DARK_THEME
  );

  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      if (theme.id === DARK_THEME_ID) {
        localStorage.setItem("theme", LIGHT_THEME_ID);

        return LIGHT_THEME;
      }
      if (theme.id === LIGHT_THEME_ID) {
        localStorage.setItem("theme", DARK_THEME_ID);

        return DARK_THEME;
      }

      return theme;
    });
  }, []);

  const memoValue = useMemo(() => {
    const value: IThemeContext = {
      theme: theme,
      toggleTheme: toggleTheme,
      isDark: theme.id === DARK_THEME_ID,
      isLight: theme.id === LIGHT_THEME_ID,
    };
    return value;
  }, [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={memoValue}>
      {theme ? props.children : null}
    </ThemeContext.Provider>
  );
});
