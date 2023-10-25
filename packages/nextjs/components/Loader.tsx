type Size = "xs" | "sm" | "md" | "lg";

export const Loader = ({ size = "sm" }: { size?: Size }) => {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
};
