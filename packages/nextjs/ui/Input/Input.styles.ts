import { CSSProperties } from "react";
import { exoFont } from "~~/public/assets/fonts";
import { coreColors, palette } from "~~/styles/colors";

export const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",
  backgroundColor: "white",
  borderRadius: "8px",
  borderWidth: "2px",
  borderColor: palette.slate[100],
  fontFamily: exoFont.style.fontFamily,
  width: undefined,
  fontSize: "14px",
};

export const labelStyle: CSSProperties = {
  color: coreColors.gray,
};

export const inputStyle: CSSProperties = {
  backgroundColor: "transparent",
  minWidth: "320px",
  outline: "none",
  color: coreColors.black,
};

export const focusedContainerInputStyle: CSSProperties = {
  borderColor: palette.purple[100],
};

export const errorMessageStyle: CSSProperties = {
  marginTop: "4px",
  color: coreColors.red,
};

export const errorContainerStyle: CSSProperties = {
  borderColor: coreColors.red,
};
