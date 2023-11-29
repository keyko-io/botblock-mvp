import { HTMLProps, PropsWithChildren } from "react";
import { Text } from "../../Text/Text";
import { baseOptionStyle, selectedOptionStyle } from "./Option.styles";

interface OptionProps extends HTMLProps<HTMLButtonElement> {
  isSelected?: boolean;
}

export const Option = ({ children, key, isSelected, onClick, style }: PropsWithChildren<OptionProps>) => (
  <button
    key={key}
    onClick={onClick}
    style={{
      ...baseOptionStyle,
      ...(isSelected && selectedOptionStyle),
      ...style,
    }}
  >
    {typeof children === "string" ? <Text>{children}</Text> : children}
  </button>
);
