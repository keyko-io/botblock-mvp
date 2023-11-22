import { CSSProperties } from "react";
import { palette } from "~~/styles/colors";

export const baseDropdownStyle: CSSProperties = {
  position: "absolute",
  right: 0,
  zIndex: -1,
  display: "none",
  inset: "0px 0px auto auto",
  margin: 0,
  padding: 0,
  backgroundColor: "#f8f8f8",
  transform: "translate3d(0px, 2rem, 0px)",
  textAlign: "center",
  listStyle: "none",
  borderWidth: "1px",
  borderColor: palette.yellow[100],
  borderRadius: "8px",
  minWidth: "100%",
};

export const openDropdownStyle: CSSProperties = {
  display: "block",
  zIndex: 1,
};
