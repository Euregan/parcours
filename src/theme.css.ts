import { createTheme, globalStyle } from "@vanilla-extract/css";

const background = "#1c1c1e";

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
