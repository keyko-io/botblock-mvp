import { PropsWithChildren } from "react";
import { styles } from "./Text.styles";
import { TextType } from "./Text.types";

interface TextProps {
  as?: "p" | "span" | "pre";
  type?: TextType;
}

export const Text = ({ as: Element = "p", children, type = "p-lg" }: PropsWithChildren<TextProps>) => {
  return <Element style={styles[type]}>{children}</Element>;
};
