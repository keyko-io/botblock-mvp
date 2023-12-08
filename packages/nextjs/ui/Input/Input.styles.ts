import { CSSProperties } from "react";
import { exoFont } from "~~/public/assets/fonts";
import { coreColors, palette } from "~~/styles/colors";

export const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  padding: "10px 20px",
  backgroundColor: palette.slate[100],
  borderRadius: "8px",
  borderWidth: "1px",
  borderColor: coreColors.gray,
  fontFamily: exoFont.style.fontFamily,
  width: undefined,
};

export const labelStyle: CSSProperties = {
  color: coreColors.gray,
};

export const inputStyle: CSSProperties = {
  backgroundColor: "transparent",
  minWidth: "320px",
  outline: "none",
  color: coreColors.lightGray,
};

export const focusedContainerInputStyle: CSSProperties = {
  borderColor: coreColors.lightGray,
};

export const errorMessageStyle: CSSProperties = {
  marginTop: "4px",
  color: coreColors.red,
};

export const errorContainerStyle: CSSProperties = {
  borderColor: coreColors.red,
};
