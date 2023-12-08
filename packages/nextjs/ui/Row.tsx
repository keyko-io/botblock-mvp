import React, { AriaAttributes, ComponentPropsWithRef, HTMLAttributes, ReactNode } from "react";

type Ref = HTMLElement | SVGElement;
export interface RowProps extends AriaAttributes, ComponentPropsWithRef<any>, HTMLAttributes<any> {
  children?: ReactNode;
  as?: React.ElementType;
}

export const Row = React.memo(
  React.forwardRef<Ref, RowProps>(({ children, as = "div", style, ...rest }, ref) => {
    const Component = as;

    return (
      <Component ref={ref} style={{ ...rowStyle, ...style }} {...rest}>
        {children}
      </Component>
    );
  }),
);
const rowStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

Row.displayName = "Row";
