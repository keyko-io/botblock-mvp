import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { LargeLogo } from "./LargeLogo";
import { Text } from "~~/ui";

const TextButton = ({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <Text as="button" onClick={onClick} type="btn-sm" color="light" style={{ width: "fit-content", padding: "4px" }}>
      {children}
    </Text>
  );
};

export const Footer = () => {
  const router = useRouter();

  const browseToProtect = () => router.push("/protect");
  const browseToPartner = () => router.push("/unlock/partner");
  const browseToSubscribe = () => router.push("/subscribe");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 0,
        bottom: 0,
        backgroundColor: "#1a5e73", // turquoise[100] + slate[50]
        padding: "48px",
      }}
    >
      <div className="flex-1">
        <LargeLogo isLight />
      </div>
      <div className="flex flex-col flex-1 justify-start items-start">
        <Text type="h3" color="light">
          Sections
        </Text>
        <div className="flex flex-col mt-4 gap-2">
          <TextButton onClick={browseToProtect}>Protect</TextButton>
          <TextButton onClick={browseToPartner}>Partner</TextButton>
          <TextButton onClick={browseToSubscribe}>Subscribe</TextButton>
        </div>
      </div>
    </div>
  );
};
