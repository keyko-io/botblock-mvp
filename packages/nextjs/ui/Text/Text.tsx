import { PropsWithChildren } from "react";
import { typographyStyles } from "./Text.styles";
import { Typography } from "./Text.types";

interface TextProps {
  as?: "p" | "span" | "pre";
  type?: Typography;
}

export const Text = ({ as: Element = "p", children, type = "p-lg" }: PropsWithChildren<TextProps>) => {
  return <Element style={typographyStyles[type]}>{children}</Element>;
};
