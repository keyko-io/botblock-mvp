import { HTMLProps } from "react";
import { Text } from "../Text/Text";
import { containerStyle, inputStyle, labelStyle } from "./Input.styles";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label = "Input Label", ...inputProps }: InputProps) => {
  return (
    <div style={containerStyle}>
      <Text type="label" style={labelStyle}>
        {label}
      </Text>
      <input type="text" style={inputStyle} {...inputProps} />
    </div>
  );
};
