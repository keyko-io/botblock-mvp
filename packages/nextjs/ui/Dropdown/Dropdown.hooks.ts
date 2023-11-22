import { useState } from "react";

interface DropdownHookProps {
  controller?: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
}

export const useDropdown = (props?: DropdownHookProps) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isOpen = props?.controller?.isOpen ?? uncontrolledIsOpen;
  const setIsOpen = props?.controller?.setIsOpen ?? setUncontrolledIsOpen;

  return {
    isDropdownOpen: isOpen,
    setIsDropdownOpen: setIsOpen,
  };
};
