import { CSSProperties } from "react";
import { ButtonColors } from "./Button.types";
import WhiteGrungeImage from "~~/public/assets/images/white-grunge.png";
import { coreColors, palette } from "~~/styles/colors";

export const baseButtonStyle: CSSProperties = {
  padding: "10px 20px",
  flexDirection: "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  width: "fit-content",
  borderRadius: "20px",
};

export const colorButtonStyle: Record<ButtonColors, CSSProperties> = {
  primary: {
    backgroundColor: palette.purple[100],
  },
  secondary: {
    backgroundColor: palette.slate[100],
  },
  ternary: {
    backgroundColor: "#FFFFFF",
  },
};

export const grungeButtonStyle: CSSProperties = {
  backgroundImage: `url("${WhiteGrungeImage.src}")`,
  backgroundSize: "cover",
};

export const blackBorderButtonStyle: CSSProperties = {
  border: `1px solid ${coreColors.black}`,
};
