import { ComponentType, Fragment, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { Text } from "../Text/Text";
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
    // TODO: fix styling
    <button className="w-fit" onClick={onClick} style={{ borderWidth: "1px", borderColor: "white", padding: "10px" }}>
      <Text type={`btn-${size}`}>{children}</Text>
      <MappedIcon />
    </button>
  );
};
