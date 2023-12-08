import React, { AriaAttributes, ComponentPropsWithRef, HTMLAttributes, ReactNode } from "react";

type Ref = HTMLElement | SVGElement;
interface ColumnProps extends AriaAttributes, ComponentPropsWithRef<any>, HTMLAttributes<any> {
  children: ReactNode;
  as?: React.ElementType;
}

export const Column = React.memo(
  React.forwardRef<Ref, ColumnProps>(({ children, as = "div", style, ...rest }, ref) => {
    const Component = as;

    return (
      <Component ref={ref} style={{ ...columnStyle, ...style }} {...rest}>
        {children}
      </Component>
    );
  }),
);
const columnStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

Column.displayName = "Column";
