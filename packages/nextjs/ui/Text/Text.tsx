import { PropsWithChildren } from "react";
import { textColorStyles, typographyStyles } from "./Text.styles";
import { Typography } from "./Text.types";

interface TextProps {
  as?: "p" | "span" | "pre";
  color?: "themed" | "light" | "dark";
  type?: Typography;
}

export const Text = ({
  as: Element = "p",
  children,
  color = "themed",
  type = "p-lg",
}: PropsWithChildren<TextProps>) => {
  return <Element style={{ ...textColorStyles[color], ...typographyStyles[type] }}>{children}</Element>;
};
