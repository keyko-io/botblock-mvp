import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";
import {
  baseDropdownStyle,
  openDropdownStyle,
  shadowDropdownStyle,
  twoLineButtonDropdownStyle,
} from "./Dropdown.styles";

interface DropdownProps {
  close: () => void;
  id?: string;
  isOpen?: boolean;
  shadowBox?: boolean;
  style?: CSSProperties;
  isTwoLineButton?: boolean;
}

export const Dropdown = ({
  children,
  id,
  close,
  isOpen = false,
  shadowBox = false,
  style,
  isTwoLineButton,
}: PropsWithChildren<DropdownProps>) => {
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
        ...(isTwoLineButton && twoLineButtonDropdownStyle),
        ...(shadowBox && shadowDropdownStyle),
        ...style,
        ...(isOpen && openDropdownStyle),
      }}
    >
      {children}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
