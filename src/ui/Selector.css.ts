import { style } from "@vanilla-extract/css";
import { theme } from "../theme.css";

export const fieldset = style({
  all: "unset",
  background: theme.colors.background,
  display: "flex",
  borderRadius: "40px",
  padding: "2px",
  border: `1px ${theme.colors.border} solid`,
});

export const radio = style({
  all: "unset",
  width: 0,
  height: 0,
});

export const label = style({
  color: "#c1c9d3",
  padding: "12px 24px",
  cursor: "pointer",
  borderRadius: "40px",
  transition: "all .2s",
  transitionTimingFunction: "ease-in",
  border: "1px transparent solid",
  selectors: {
    [`${radio}:checked + &`]: {
      background: "#333336",
      color: "white",
      border: `1px ${theme.colors.border} solid`,
      transitionTimingFunction: "ease-out",
    },
    [`input:not(${radio}:checked) + &:hover`]: {
      background: "#222226",
      color: "white",
      border: `1px ${theme.colors.border} solid`,
      transitionTimingFunction: "ease-out",
    },
  },
});
