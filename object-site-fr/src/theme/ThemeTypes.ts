import type { DARK_THEME_COLOR, DARK_THEME_ID } from "./variants/dark";

export type ColorTheme = typeof DARK_THEME_COLOR;

export interface IThemeContext {
  theme: ITheme;
  toggleTheme(): void;
  isDark: boolean;
  isLight: boolean;
}

export interface ITheme {
  id: string;
  color: ColorTheme;
}
