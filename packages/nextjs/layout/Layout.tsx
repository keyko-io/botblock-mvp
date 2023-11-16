import { PropsWithChildren } from "react";
import { Providers } from "./Providers";
import { MetaHeader } from "~~/ui/MetaHeader";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MetaHeader />
      <Providers>{children}</Providers>
    </>
  );
};
