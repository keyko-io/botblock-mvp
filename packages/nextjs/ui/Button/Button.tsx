import { ComponentType, Fragment, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { Text } from "../Text/Text";
import { baseButtonStyle } from "./Button.styles";
import { ButtonIcons } from "./Button.types";

const ArrowIcon = dynamic(() => import("~~/public/assets/icons/arrow.svg"));
const RemoveIcon = dynamic(() => import("~~/public/assets/icons/remove.svg"));
const PlusIcon = dynamic(() => import("~~/public/assets/icons/plus.svg"));

const iconMap: Record<ButtonIcons, ComponentType> = {
  "arrow-right": ArrowIcon,
  close: RemoveIcon,
  plus: PlusIcon,
};

interface ButtonProps extends PropsWithChildren {
  icon?: ButtonIcons;
  onClick: () => void;
  size?: "sm" | "lg";
}

export const Button = ({ children, icon, onClick, size = "sm" }: ButtonProps) => {
  const MappedIcon = !!icon ? iconMap[icon] : Fragment;
  return (
    <button onClick={onClick} style={baseButtonStyle}>
      <Text type={`btn-${size}`}>{children}</Text>
      <MappedIcon />
    </button>
  );
};
