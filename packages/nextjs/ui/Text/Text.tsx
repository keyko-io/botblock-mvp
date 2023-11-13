import { CSSProperties, ElementType, PropsWithChildren } from "react";
import { baseTextStyles, textColorStyles, typographyStyles } from "./Text.styles";
import { Typography } from "./Text.types";

interface TextProps {
  as?: ElementType;
  color?: "themed" | "light" | "dark";
  type?: Typography;
  style?: CSSProperties;
}

export const Text = ({ as = "p", children, color = "themed", type = "p-lg", style }: PropsWithChildren<TextProps>) => {
  const Element = type === "label" ? "label" : as;
  return (
    <Element style={{ ...baseTextStyles, ...textColorStyles[color], ...typographyStyles[type], ...style }}>
      {children}
    </Element>
  );
};
