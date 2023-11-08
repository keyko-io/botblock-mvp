import { CSSProperties, PropsWithChildren } from "react";
import { baseTextStyles, textColorStyles, typographyStyles } from "./Text.styles";
import { Typography } from "./Text.types";

interface TextProps {
  as?: "p" | "span" | "pre";
  color?: "themed" | "light" | "dark";
  type?: Typography;
  style?: CSSProperties;
}

export const Text = ({
  as: Element = "p",
  children,
  color = "themed",
  type = "p-lg",
  style,
}: PropsWithChildren<TextProps>) => {
  return (
    <Element style={{ ...baseTextStyles, ...textColorStyles[color], ...typographyStyles[type], ...style }}>
      {children}
    </Element>
  );
};
