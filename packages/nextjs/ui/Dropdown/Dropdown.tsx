import { PropsWithChildren, useEffect, useRef } from "react";
import { baseDropdownStyle, openDropdownStyle } from "./Dropdown.styles";

interface DropdownProps {
  close: () => void;
  id?: string;
  isOpen?: boolean;
}

export const Dropdown = ({ children, close, id, isOpen = false }: PropsWithChildren<DropdownProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (isOpen && ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, ref, close]);

  return (
    <div
      id={id}
      ref={ref}
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
