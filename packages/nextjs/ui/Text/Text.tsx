import { CSSProperties, ElementType, PropsWithChildren } from "react";
import { baseTextStyles, textColorStyles, typographyStyles } from "./Text.styles";
import { Typography } from "./Text.types";

interface TextProps {
  as?: ElementType;
  onClick?: () => void;
  color?: "error" | "light" | "dark";
  htmlFor?: string;
  type?: Typography;
  style?: CSSProperties;
}

// Typographies that translate directly into HTML elements
export const textTypeTypographies = ["h1", "h2", "h3", "label"];

export const Text = ({
  as,
  children,
  color = "light",
  type = "p-lg",
  style,
  ...rest
}: PropsWithChildren<TextProps>) => {
  // Default element to the given `as` prop. If undefined, default to valid typography type or `p`
  const Element = as ?? textTypeTypographies.includes(type) ? (type as ElementType) : "p";
  return (
    <Element {...rest} style={{ ...baseTextStyles, ...textColorStyles[color], ...typographyStyles[type], ...style }}>
      {children}
    </Element>
  );
};
