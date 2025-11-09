import { useContext, useMemo } from "react";
import { ThemeContext } from "@theme/ThemeContext";
import type { CSSProperties } from "react";

const useThemeStyle = () => {
  const { theme } = useContext(ThemeContext);
  const computedStyle = useMemo(() => {
    return {
      "--background": theme.color.background || "",
      "--text": theme.color.text || "",
      "--commonBorder": theme.color.common.border || "",
      "--commonBorderActive": theme.color.common.borderActive || "",
      "--headerBackground": theme.color.header.background || "",
      "--headerDropMenuBackground":
        theme.color.header.dropMenu.background || "",
      "--headerDropMenuBorder": theme.color.header.dropMenu.border || "",
      "--headerDropMenuItemBorder":
        theme.color.header.dropMenu.item.border || "",
      "--trackListBackground": theme.color.trackList.background || "",
      "--trackListBackgroundActive":
        theme.color.trackList.backgroundActive || "",
      "--rightSiderBackground": theme.color.rightSider.background || "",
      "--svgItemsFilter": theme.color.svgItems.filter || "",
      "--svgItemsFilterActive": theme.color.svgItems.filterActive || "",
      "--settingsBackground": theme.color.settings.background || "",
      "--settingsSettingsItemBackground":
        theme.color.settings.settingsItem.background || "",
      "--settingsSettingsItemBorder":
        theme.color.settings.settingsItem.border || "",
      "--settingsSettingsItemBackgroundActive":
        theme.color.settings.settingsItem.backgroundActive || "",
      "--settingsSettingsItemBorderActive":
        theme.color.settings.settingsItem.borderActive || "",
      "--gray1": theme.color.gray.gray1 || "",
      "--gray2": theme.color.gray.gray2 || "",
      "--gray3": theme.color.gray.gray3 || "",
    } as CSSProperties;
  }, [theme]);

  return computedStyle;
};

export { useThemeStyle };
