import { HTMLProps, PropsWithChildren } from "react";
import { Text } from "../../Text/Text";
import { baseOptionStyle, roundBottomOptionStyle, roundTopOptionStyle, selectedOptionStyle } from "./Option.styles";

interface OptionProps extends HTMLProps<HTMLButtonElement> {
  isSelected?: boolean;
  roundBottom?: boolean;
  roundTop?: boolean;
}

export const Option = ({
  children,
  key,
  isSelected,
  onClick,
  roundBottom,
  roundTop,
  style,
}: PropsWithChildren<OptionProps>) => (
  <button
    key={key}
    onClick={onClick}
    style={{
      ...baseOptionStyle,
      ...(isSelected && selectedOptionStyle),
      ...(roundBottom && roundBottomOptionStyle),
      ...(roundTop && roundTopOptionStyle),
      ...style,
    }}
  >
    {typeof children === "string" ? <Text>{children}</Text> : children}
  </button>
);
