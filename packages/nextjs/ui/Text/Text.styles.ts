import { CSSProperties } from "react";
import { Typography } from "./Text.types";
import { courierPrimeFont, exoFont } from "~~/public/assets/fonts";

export const typographyStyles: Record<Typography, CSSProperties> = {
  h1: {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "42px",
    lineHeight: "1",
    letterSpacing: "-1px",
  },
  h2: {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "24px",
    lineHeight: "1",
    letterSpacing: "0px",
  },
  h3: {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "18px",
    lineHeight: "1",
    letterSpacing: "0px",
  },
  subheading: {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "16px",
    lineHeight: "107%",
    letterSpacing: "0px",
  },
  "p-lg": {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "16px",
    lineHeight: "125%",
    letterSpacing: "0px",
  },
  "p-sm": {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "16px",
    lineHeight: "150%",
    letterSpacing: "-2%",
  },
  stats: {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "30px",
    lineHeight: "100%",
    letterSpacing: "0px",
  },
  "nav-link": {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "15px",
    lineHeight: "100%",
    letterSpacing: "0px",
  },
  label: {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "11px",
    lineHeight: "100%",
    letterSpacing: "0px",
  },
  "sm-print": {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "11px",
    lineHeight: "100%",
    letterSpacing: "0px",
  },
  "btn-lg": {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "15px",
    lineHeight: "100%",
    letterSpacing: "0px",
    margin: 0,
  },
  "btn-sm": {
    fontFamily: exoFont.style.fontFamily,
    fontSize: "12px",
    lineHeight: "100%",
    letterSpacing: "0px",
    margin: 0,
  },
  markdown: {
    fontFamily: courierPrimeFont.style.fontFamily,
    fontSize: "14px",
    lineHeight: "140%",
    letterSpacing: "0px",
  },
};
