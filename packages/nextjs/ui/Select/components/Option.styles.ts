import { CSSProperties } from "react";
import { coreColors } from "~~/styles/colors";

export const baseOptionStyle: CSSProperties = {
  padding: "0.5rem",
  width: "100%",
};

export const selectedOptionStyle: CSSProperties = {
  backgroundColor: coreColors.gray,
};
