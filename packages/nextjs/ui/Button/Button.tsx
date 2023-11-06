import { PropsWithChildren } from "react";
import { Text } from "../Text/Text";

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
  size?: "sm" | "lg";
}

export const Button = ({ children, onClick, size = "sm" }: ButtonProps) => {
  return (
    // TODO: fix styling
    <button className="w-fit" onClick={onClick} style={{ borderWidth: "1px", borderColor: "white", padding: "10px" }}>
      <Text type={`btn-${size}`}>{children}</Text>
    </button>
  );
};
