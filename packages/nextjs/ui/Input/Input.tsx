import { HTMLProps } from "react";
import { Text } from "../Text/Text";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label = "Input Label", ...inputProps }: InputProps) => {
  return (
    <div>
      <Text type="label">{label}</Text>
      <input type="text" {...inputProps} />
    </div>
  );
};
