import { CSSProperties, ElementType, PropsWithChildren } from "react";
import { baseTextStyles, textColorStyles, typographyStyles } from "./Text.styles";
import { Typography } from "./Text.types";

interface TextProps {
  as?: ElementType;
  onClick?: () => void;
  color?: "themed" | "light" | "dark";
  type?: Typography;
  style?: CSSProperties;
}

export const Text = ({
  as = "p",
  children,
  color = "themed",
  type = "p-lg",
  style,
  ...rest
}: PropsWithChildren<TextProps>) => {
  const Element = type === "label" ? "label" : as;
  return (
    <Element {...rest} style={{ ...baseTextStyles, ...textColorStyles[color], ...typographyStyles[type], ...style }}>
      {children}
    </Element>
  );
};
