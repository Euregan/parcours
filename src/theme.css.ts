import { createTheme, globalStyle } from "@vanilla-extract/css";

const background = "#242424";

globalStyle("body", {
  all: "unset",
  background,
});

export const [themeClass, theme] = createTheme({
  background,
});
