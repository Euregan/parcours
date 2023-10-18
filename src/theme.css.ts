import { createGlobalTheme, fontFace, globalStyle } from "@vanilla-extract/css";
import settings from "./settings";

const fira = fontFace({
  src: `url(/FiraSans-Regular.ttf)`,
});

export const theme = createGlobalTheme(":root", {
  colors: {
    background: settings.colors.background,
    border: "#2a2a2b",
  },
  font: fira,
});

globalStyle("body, #root, main", {
  all: "unset",
  background: "black",
  fontFamily: theme.font,
  display: "block",
  height: "100vh",
  width: "100vw",
});
