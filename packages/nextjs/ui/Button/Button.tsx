import { ComponentType, Fragment, PropsWithChildren, SVGProps } from "react";
import dynamic from "next/dynamic";
import { Text } from "../Text/Text";
import { baseButtonStyle, blackBorderButtonStyle, colorButtonStyle, grungeButtonStyle } from "./Button.styles";
import { ButtonColors, ButtonIcons } from "./Button.types";
import { coreColors } from "~~/styles/colors";

const ArrowIcon = dynamic(() => import("~~/public/assets/icons/arrow.svg"));
const RemoveIcon = dynamic(() => import("~~/public/assets/icons/remove.svg"));
const PlusIcon = dynamic(() => import("~~/public/assets/icons/plus.svg"));

// Cast SVGProps to any to avoid type errors when using them
const iconMap: Record<ButtonIcons, ComponentType<SVGProps<any>>> = {
  "arrow-right": ArrowIcon,
  close: RemoveIcon,
  plus: PlusIcon,
};

interface ButtonProps extends PropsWithChildren {
  color?: ButtonColors;
  disabled?: boolean;
  icon?: ButtonIcons;
  onClick: () => void;
  size?: "sm" | "lg";
}

export const Button = ({ color = "primary", children, disabled = false, icon, onClick, size = "sm" }: ButtonProps) => {
  const MappedIcon = !!icon ? iconMap[icon] : Fragment;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseButtonStyle,
        ...colorButtonStyle[color],
        ...(size === "lg" ? grungeButtonStyle : {}),
        ...(color === "ternary" ? blackBorderButtonStyle : {}),
      }}
    >
      <Text color={color === "ternary" ? "dark" : "light"} type={`btn-${size}`}>
        {children}
      </Text>
      <MappedIcon color={color === "ternary" ? coreColors.black : coreColors.white} />
    </button>
  );
};
