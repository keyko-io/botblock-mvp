import { InputHTMLAttributes, SVGProps, useState } from "react";
import dynamic from "next/dynamic";
import { Column } from "../Column";
import { Dropdown } from "../Dropdown/Dropdown";
import { Row } from "../Row";
import { Text } from "../Text/Text";
import { coreColors, palette } from "~~/styles/colors";

const ChevronIcon = dynamic<SVGProps<SVGSVGElement>>(() => import("~~/public/assets/icons/chevron.svg"));

interface SelectProps extends Omit<InputHTMLAttributes<any>, "onChange"> {
  label?: string;
  selected: string;
}

export const Select = ({ disabled, id, label, selected }: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <Column
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        width: undefined,
      }}
    >
      <Row
        as="button"
        id={id}
        disabled={isDropdownOpen || disabled}
        onClick={openDropdown}
        style={{
          borderWidth: "1px",
          borderRadius: "8px",
          padding: "12px 20px",
          gap: "16px",
          backgroundColor: palette.slate[100],
        }}
      >
        <Column style={{ alignItems: "flex-start", flex: 1, width: "100%", ...(label && { gap: "8px" }) }}>
          {label && (
            <Text htmlFor={id} type="label">
              {label}
            </Text>
          )}
          <Text>{selected}</Text>
        </Column>
        <Column style={{ alignItems: "flex-end", width: undefined }}>
          <ChevronIcon color={coreColors.lightGray} style={{ transform: "rotate(-90deg)" }} />
        </Column>
      </Row>
      <Dropdown
        isOpen={isDropdownOpen}
        close={closeDropdown}
        isTwoLineButton={!!label}
        style={{
          backgroundColor: palette.slate[100],
        }}
      >
        <Column></Column>
      </Dropdown>
    </Column>
  );
};
