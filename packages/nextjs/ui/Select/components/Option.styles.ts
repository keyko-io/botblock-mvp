import { CSSProperties } from "react";
import { coreColors } from "~~/styles/colors";

export const baseOptionStyle: CSSProperties = {
  padding: "0.5rem",
  width: "100%",
};

export const selectedOptionStyle: CSSProperties = {
  backgroundColor: coreColors.gray,
};

export const roundBottomOptionStyle: CSSProperties = {
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
};

export const roundTopOptionStyle: CSSProperties = {
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
};
