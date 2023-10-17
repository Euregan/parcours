import { createVar, style } from "@vanilla-extract/css";
import { theme } from "../theme.css";

export const height = createVar();

export const path = style({
  fill: theme.background,
  transform: `translateY(calc(${height} * -4px))`,
});
