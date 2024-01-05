import { CSSProperties } from "react";
import { TextColors, Typography } from "./Text.types";
import { courierPrimeFont, exoFont } from "~~/public/assets/fonts";
import { coreColors } from "~~/styles/colors";

export const baseTextStyles: CSSProperties = {
  margin: 0,
  padding: 0,
  lineHeight: "1",
  letterSpacing: "0px",
  fontFamily: exoFont.style.fontFamily,
  textAlign: "left",
};

export const textColorStyles: Record<TextColors, CSSProperties> = {
  error: {
    color: coreColors.red,
  },
  dark: {
    color: coreColors.black,
  },
  light: {
    color: coreColors.black,
  },
};

export const typographyStyles: Record<Typography, CSSProperties> = {
  h1: {
    fontSize: "42px",
    letterSpacing: "-1px",
  },
  h2: {
    fontSize: "24px",
  },
  h3: {
    fontSize: "20px",
  },
  "h3-hyperlink": {
    fontSize: "20px",
    cursor: "pointer",
  },
  subheading: {
    fontSize: "18px",
    lineHeight: "107%",
  },
  "p-lg": {
    fontSize: "16px",
    lineHeight: "125%",
  },
  "p-sm": {
    fontSize: "16px",
    lineHeight: "150%",
    letterSpacing: "-2%",
  },
  stats: {
    fontSize: "30px",
  },
  "nav-link": {
    fontSize: "15px",
  },
  label: {
    fontSize: "10px",
  },
  "sm-print": {
    fontSize: "11px",
  },
  "btn-lg": {
    fontSize: "15px",
    cursor: "pointer",
  },
  "btn-sm": {
    fontSize: "12px",
    cursor: "pointer",
  },
  markdown: {
    fontFamily: courierPrimeFont.style.fontFamily,
    fontSize: "14px",
    lineHeight: "140%",
  },
};
