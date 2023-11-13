import { useRouter } from "next/router";
import { LargeLogo } from "./LargeLogo";
import { Text } from "./Text/Text";
import { palette } from "~~/styles/colors";

export const Footer = () => {
  const router = useRouter();

  const browseToProtect = () => router.push("/protect");
  const browseToPartner = () => router.push("/unlock/partner");
  const browseToSubscribe = () => router.push("/subscribe");

  return (
    <div className="flex flex-col px-12" style={{ flex: 1, backgroundColor: palette.slate[100] }}>
      <div className="flex flex-row items-start my-12" style={{ flex: 2, minHeight: "110px" }}>
        <div className="flex" style={{ flex: 1 }}>
          <LargeLogo isLight />
        </div>
        <div className="flex flex-col justify-start items-start" style={{ flex: 1 }}>
          <Text type="h3" color="light">
            Sections
          </Text>
          <div className="flex flex-col mt-8 gap-4">
            <Text as="button" onClick={browseToProtect} type="btn-sm" color="light">
              Protect
            </Text>
            <Text as="button" onClick={browseToPartner} type="btn-sm" color="light">
              Partner
            </Text>
            <Text as="button" onClick={browseToSubscribe} type="btn-sm" color="light">
              Subscribe
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
