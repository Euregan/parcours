import { style } from "@vanilla-extract/css";

export const svg = style({
  width: 600,
  height: 1200,
  // 3D stuff
  perspective: 650,
  transform: "rotateX(60deg)",
});
