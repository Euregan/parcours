import { style } from "@vanilla-extract/css";

export const footer = style({
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",

  padding: `8px 12px`,
  color: "white",
});

export const link = style({
  all: "unset",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
});
