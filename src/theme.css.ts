import { createTheme, globalStyle } from "@vanilla-extract/css";
import settings from "./settings";

globalStyle("body, #root, main", {
  all: "unset",
  background: settings.colors.background,
  display: "block",
  height: "100vh",
  width: "100vw",
});

export const [themeClass, theme] = createTheme({
  background: settings.colors.background,
});
