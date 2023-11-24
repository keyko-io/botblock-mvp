import { CSSProperties } from "react";
import { exoFont } from "~~/public/assets/fonts";
import { coreColors, pressableColors } from "~~/styles/colors";

export const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",
  backgroundColor: coreColors.white,
  borderRadius: "8px",
  borderWidth: "1px",
  borderColor: coreColors.black,
  fontFamily: exoFont.style.fontFamily,
};

export const labelStyle: CSSProperties = {
  color: pressableColors.placeholderText,
};

export const inputStyle: CSSProperties = {
  backgroundColor: "transparent",
  minWidth: "320px",
  outline: "none",
};
