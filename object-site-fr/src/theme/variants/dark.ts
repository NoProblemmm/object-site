export const DARK_THEME_COLOR = {
  background: "url(/public/static/background-hero.jpg)",
  text: "#fff",

  common: {
    border: "#636363",
    borderActive: "#c0c0c0",
  },
  header: {
    background: "rgba(0, 0, 0, 0.034)",
    dropMenu: {
      background: "#202020",
      border: "#424242",
      item: {
        border: "#444444",
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
    background: "rgba(48, 48, 48, 0.034)",
    settingsItem: {
      background: "rgba(95, 95, 95, 0.171)",
      border: "#000000",
      backgroundActive: "rgba(0, 90, 63, 0.384)",
      borderActive: "#006446",
    },
  },
  gray: {
    gray1: "rgba(31, 31, 31, 0.021)",
    gray2: "rgba(46, 46, 46, 0.979)",
    gray3: "rgba(48, 48, 48, 0.2)",
  },
};

export const DARK_THEME_ID = "dark_theme";

export const DARK_THEME = {
  id: DARK_THEME_ID,
  color: DARK_THEME_COLOR,
};
