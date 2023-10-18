import { style } from "@vanilla-extract/css";
import { theme } from "../theme.css";

export const course = style({
  background: theme.background,
  width: "1000px",
  height: "1000px",
  borderRadius: "40px",
  border: "1px #2a2a2b solid",
  overflow: "hidden",
});
