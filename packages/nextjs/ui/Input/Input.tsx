import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { Text } from "../Text/Text";
import {
  containerStyle,
  errorContainerStyle,
  errorMessageStyle,
  focusedContainerInputStyle,
  inputStyle,
  labelStyle,
} from "./Input.styles";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export const Input = ({ errorMessage, label, style, value, ...inputProps }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <div
        style={{
          ...containerStyle,
          ...(isFocused && focusedContainerInputStyle),
          ...(errorMessage && errorContainerStyle),
          ...style,
        }}
      >
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
      {errorMessage && (
        <Text type="sm-print" style={errorMessageStyle}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};
