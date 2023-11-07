import { ComponentType, Fragment, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { Text } from "../Text/Text";
import { baseButtonStyle, colorButtonStyle, grungeButtonStyle } from "./Button.styles";
import { ButtonColors, ButtonIcons } from "./Button.types";

const ArrowIcon = dynamic(() => import("~~/public/assets/icons/arrow.svg"));
const RemoveIcon = dynamic(() => import("~~/public/assets/icons/remove.svg"));
const PlusIcon = dynamic(() => import("~~/public/assets/icons/plus.svg"));

const iconMap: Record<ButtonIcons, ComponentType> = {
  "arrow-right": ArrowIcon,
  close: RemoveIcon,
  plus: PlusIcon,
};

interface ButtonProps extends PropsWithChildren {
  color?: ButtonColors;
  icon?: ButtonIcons;
  onClick: () => void;
  size?: "sm" | "lg";
}

export const Button = ({ color = "primary", children, icon, onClick, size = "sm" }: ButtonProps) => {
  const MappedIcon = !!icon ? iconMap[icon] : Fragment;
  return (
    <button
      onClick={onClick}
      style={{ ...baseButtonStyle, ...colorButtonStyle[color], ...(size === "lg" ? grungeButtonStyle : {}) }}
    >
      <Text color={color === "ternary" ? "dark" : "light"} type={`btn-${size}`}>
        {children}
      </Text>
      <MappedIcon />
    </button>
  );
};
