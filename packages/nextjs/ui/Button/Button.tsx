import { ComponentType, PropsWithChildren, SVGProps } from "react";
import dynamic from "next/dynamic";
import { Loader } from "../Loader";
import { Text } from "../Text/Text";
import { baseButtonStyle, blackBorderButtonStyle, colorButtonStyle, grungeButtonStyle } from "./Button.styles";
import { ButtonColors, ButtonIcons } from "./Button.types";
import { coreColors } from "~~/styles/colors";

const ArrowIcon = dynamic(() => import("~~/public/assets/icons/arrow.svg"));
const RemoveIcon = dynamic(() => import("~~/public/assets/icons/remove.svg"));
const PlusIcon = dynamic(() => import("~~/public/assets/icons/plus.svg"));

// Cast SVGProps to any to avoid type errors when using them
const iconMap: Record<ButtonIcons, ComponentType<SVGProps<SVGElement>>> = {
  "arrow-right": ArrowIcon,
  close: RemoveIcon,
  plus: PlusIcon,
};

interface ButtonProps extends PropsWithChildren {
  color?: ButtonColors;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ButtonIcons;
  isLoading?: boolean;
  onClick: () => void;
  size?: "sm" | "lg";
}

export const Button = ({
  color = "primary",
  children,
  disabled = false,
  fullWidth = false,
  icon,
  isLoading,
  onClick,
  size = "sm",
}: ButtonProps) => {
  const MappedIcon = iconMap[icon as ButtonIcons];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseButtonStyle,
        ...colorButtonStyle[color],
        ...(size === "lg" ? grungeButtonStyle : {}),
        ...(color === "ternary" ? blackBorderButtonStyle : {}),
        ...(fullWidth ? { width: "100%" } : {}),
      }}
    >
      {typeof children === "string" ? (
        <Text color={color === "ternary" ? "dark" : "light"} type={`btn-${size}`}>
          {children}
        </Text>
      ) : (
        children
      )}
      {!!icon && <MappedIcon color={color === "ternary" ? coreColors.black : coreColors.white} />}
      {isLoading && <Loader />}
    </button>
  );
};
