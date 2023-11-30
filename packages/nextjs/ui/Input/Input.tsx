import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { Text } from "../Text/Text";
import { containerStyle, focusedContainerInputStyle, inputStyle, labelStyle } from "./Input.styles";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, style, value, ...inputProps }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div style={{ ...containerStyle, ...(isFocused && focusedContainerInputStyle), ...style }}>
      {label ? (
        <Text type="label" style={labelStyle}>
          {label}
        </Text>
      ) : null}
      <input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyle}
        value={value}
        {...inputProps}
      />
    </div>
  );
};
