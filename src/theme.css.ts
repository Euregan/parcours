import { createTheme, globalStyle } from "@vanilla-extract/css";

const background = "#242424";

globalStyle("body, #root, main", {
  all: "unset",
  background,
  display: "block",
  height: "100vh",
  width: "100vw",
});

export const [themeClass, theme] = createTheme({
  background,
});
