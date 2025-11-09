import type { ColorTheme } from "@theme/ThemeTypes";

export const LIGHT_THEME_COLOR: ColorTheme = {
  background: "url(/public/static/background-hero-light.jpg)",
  text: "#000000ff",

  common: {
    border: "#2b2b2bff",
    borderActive: "#555555ff",
  },
  header: {
    background: "rgba(0, 0, 0, 0.034)",
    dropMenu: {
      background: "#a7a7a7ff",
      border: "#858585ff",
      item: {
        border: "#888888ff",
      },
    },
  },
  trackList: {
    background: "rgba(41, 41, 41, 0.507)",
    backgroundActive: "rgba(0, 255, 221, 0.096)",
  },
  rightSider: {
    background: "rgba(44, 44, 44, 0.26)",
  },
  svgItems: {
    filter:
      "invert(23%) sepia(4%) saturate(8%) hue-rotate(345deg) brightness(99%) contrast(95%)",
    filterActive:
      "invert(30%) sepia(4%) saturate(8%) hue-rotate(345deg) brightness(99%) contrast(95%)",
  },

  settings: {
    background: "rgba(179, 179, 179, 0.55)",
    settingsItem: {
      background: "rgba(131, 131, 131, 0.4)",
      border: "#00000052",
      backgroundActive: "rgba(0, 90, 63, 0.384)",
      borderActive: "#006446",
    },
  },
  gray: {
    gray1: "rgba(31, 31, 31, 0.021)",
    gray2: "rgba(126, 126, 126, 0.98)",
    gray3: "rgba(168, 168, 168, 0.98)",
  },
};

export const LIGHT_THEME_ID = "light_theme";

export const LIGHT_THEME = {
  id: LIGHT_THEME_ID,
  color: LIGHT_THEME_COLOR,
};
