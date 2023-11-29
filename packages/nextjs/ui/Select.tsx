import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { Text } from "./Text/Text";

export const Select = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <>
      <button onClick={openDropdown}>
        <Text>Label</Text>
      </button>
      <Dropdown isOpen={isDropdownOpen} close={closeDropdown}></Dropdown>
    </>
  );
};
