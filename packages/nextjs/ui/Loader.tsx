import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("~~/public/assets/icons/spinner.svg"));

export const Loader = () => {
  return <Spinner />;
};
