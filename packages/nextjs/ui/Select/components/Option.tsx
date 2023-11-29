import { HTMLProps, PropsWithChildren } from "react";
import { Text } from "../../Text/Text";
import { baseOptionStyle } from "./Option.styles";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OptionProps extends HTMLProps<HTMLButtonElement> {}

export const Option = ({ children, key, onClick, style }: PropsWithChildren<OptionProps>) => (
  <button
    key={key}
    onClick={onClick}
    style={{
      ...baseOptionStyle,
      ...style,
    }}
  >
    {typeof children === "string" ? <Text>{children}</Text> : children}
  </button>
);
