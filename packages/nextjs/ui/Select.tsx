import { InputHTMLAttributes, SVGProps, useState } from "react";
import dynamic from "next/dynamic";
import { Column } from "./Column";
import { Dropdown } from "./Dropdown/Dropdown";
import { Row } from "./Row";
import { Text } from "./Text/Text";
import { coreColors } from "~~/styles/colors";

const ChevronIcon = dynamic<SVGProps<SVGSVGElement>>(() => import("~~/public/assets/icons/chevron.svg"));

interface SelectProps extends Omit<InputHTMLAttributes<any>, "onChange"> {
  label?: string;
  selected: string;
}

export const Select = ({ id, label, selected }: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <Column>
      <Row as="button" id={id} disabled={isDropdownOpen} onClick={openDropdown}>
        <Column>
          {label && (
            <Text htmlFor={id} type="label">
              {label}
            </Text>
          )}
          <Text>{selected}</Text>
        </Column>
        <Column>
          <ChevronIcon color={coreColors.lightGray} style={{ transform: "rotate(-90deg)" }} />
        </Column>
      </Row>
      <Dropdown isOpen={isDropdownOpen} close={closeDropdown}>
        <Column></Column>
      </Dropdown>
    </Column>
  );
};
