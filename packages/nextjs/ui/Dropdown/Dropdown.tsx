import { PropsWithChildren } from "react";
import { baseDropdownStyle, openDropdownStyle } from "./Dropdown.styles";

interface DropdownProps {
  isOpen?: boolean;
}

export const Dropdown = ({ children, isOpen = false }: PropsWithChildren<DropdownProps>) => {
  return (
    <div
      style={{
        ...baseDropdownStyle,
        ...(isOpen && openDropdownStyle),
      }}
    >
      {children}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
