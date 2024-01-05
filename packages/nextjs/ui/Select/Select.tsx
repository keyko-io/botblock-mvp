import { InputHTMLAttributes, SVGProps, useState } from "react";
import dynamic from "next/dynamic";
import { Column } from "../Column";
import { Dropdown } from "../Dropdown/Dropdown";
import { Row } from "../Row";
import { Text } from "../Text/Text";
import { Option } from "./components/Option";
import { coreColors } from "~~/styles/colors";

const ChevronIcon = dynamic<SVGProps<SVGSVGElement>>(() => import("~~/public/assets/icons/chevron.svg"));

interface SelectProps extends Omit<InputHTMLAttributes<any>, "onChange"> {
  label?: string;
  onChange: (newValue: string) => void;
  options: readonly string[];
  selected: string;
}

export const Select = ({ disabled, id, label, onChange, options, selected }: SelectProps) => {
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
          borderWidth: "2px",
          borderRadius: "8px",
          borderColor: coreColors.black,
          padding: "10px 20px",
          gap: "16px",
          backgroundColor: "white",
        }}
      >
        <Column style={{ alignItems: "flex-start", flex: 1, width: "100%", ...(label && { gap: "8px" }) }}>
          {label && (
            <Text htmlFor={id} type="label" style={{ color: coreColors.gray, fontSize: "10px" }}>
              {label}
            </Text>
          )}
          <Text style={{ fontSize: "14px" }}>{selected}</Text>
        </Column>
        <Column style={{ alignItems: "flex-end", width: undefined }}>
          <ChevronIcon color={coreColors.black} style={{ transform: "rotate(-90deg)", marginLeft: "10px" }} />
        </Column>
      </Row>
      <Dropdown
        isOpen={isDropdownOpen}
        close={closeDropdown}
        isTwoLineButton={!!label}
        shadowBox
        style={{
          backgroundColor: "white",
        }}
      >
        <Column>
          {options.map((value, idx) => (
            <Option
              key={value.toString()}
              roundTop={idx === 0}
              roundBottom={idx === options.length - 1}
              isSelected={value === selected}
              onClick={() => {
                onChange(value);
                closeDropdown();
              }}
            >
              {value}
            </Option>
          ))}
        </Column>
      </Dropdown>
    </Column>
  );
};
