import { InputHTMLAttributes, useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { Text } from "./Text/Text";

interface SelectProps extends Omit<InputHTMLAttributes<any>, "onChange"> {
  label?: string;
}

export const Select = ({ id, label }: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <>
      <button id={id} onClick={openDropdown}>
        {label && (
          <Text htmlFor={id} type="label">
            {label}
          </Text>
        )}
      </button>
      <Dropdown isOpen={isDropdownOpen} close={closeDropdown}></Dropdown>
    </>
  );
};
