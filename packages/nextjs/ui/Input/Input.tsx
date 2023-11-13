import { HTMLProps } from "react";
import { Text } from "../Text/Text";
import { containerStyle, inputStyle, labelStyle } from "./Input.styles";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, value, ...inputProps }: InputProps) => {
  return (
    <div style={containerStyle}>
      {label ? (
        <Text type="label" style={labelStyle}>
          {label}
        </Text>
      ) : null}
      <input type="text" style={inputStyle} value={value} {...inputProps} />
    </div>
  );
};
