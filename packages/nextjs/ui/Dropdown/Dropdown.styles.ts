import { CSSProperties } from "react";

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
  borderRadius: "8px",
  minWidth: "100%",
};

export const shadowDropdownStyle: CSSProperties = {
  boxShadow: "3px 3px 12px rgba(231, 231, 237, 0.5)",
};

export const openDropdownStyle: CSSProperties = {
  display: "block",
  zIndex: 1,
};

export const twoLineButtonDropdownStyle: CSSProperties = {
  transform: "translate3d(0px, 4rem, 0px)",
};
