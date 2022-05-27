import { FontSize, Theme as ThemeSetting } from "@/common/types/settings";
import { createTheme, Theme } from "@mui/material/styles";

export function getBaseFontSize(value: FontSize) {
  if (value === FontSize.SMALLEST) {
    return 12;
  } else if (value === FontSize.SMALL) {
    return 13;
  } else if (value === FontSize.LARGE) {
    return 15;
  } else if (value === FontSize.LARGEST) {
    return 16;
  }

  return 14;
}

export const getTheme = (mode: ThemeSetting, fontSize: FontSize): Theme =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            text: {
              primary: "#000000",
              secondary: "#202020",
            },
            background: {
              default: "#f7f5f5",
              paper: "#dadada",
            },
            primary: {
              main: "#6277f1",
            },
            divider: "#6277f1",
            secondary: {
              main: "#9a4adb",
            },
          }
        : {
            text: {
              primary: "#D2D3D3",
              secondary: "#9AA0A6",
            },
            background: {
              default: "#202124",
              paper: "#151618",
            },
            primary: {
              main: "#3f51b5",
              dark: "#344397",
            },
            divider: "#3f51b5",
            secondary: {
              main: "#c73800",
              dark: "#a32e00",
            },
          }),
    },
    typography: {
      htmlFontSize: getBaseFontSize(fontSize),
      fontSize: getBaseFontSize(fontSize),
      body1: {
        fontSize: getBaseFontSize(fontSize) * 0.875,
      },
      body2: {
        fontSize: getBaseFontSize(fontSize),
      },
    },
  });
