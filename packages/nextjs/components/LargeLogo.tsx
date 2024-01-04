import Image from "next/image";
import Link from "next/link";
import { Row, Text } from "~~/ui";

export const LargeLogo = () => {
  const keykoWebsite = "https://www.keyko.io";
  const neverminedWebsite = "https://www.nevermined.io";

  return (
    <Row className="">
      <Link href="/" className="flex items-center">
        <Image alt="BotBlock" height="30" width="30" src="/assets/icons/botblock.png" className="mr-2" />
        <Text type="h3" as="button">
          Botblock | {""}
        </Text>
      </Link>

      <Text type="h3" style={{ marginLeft: "4px" }}>
        {""} Built by{" "}
        <Link href={keykoWebsite} target="_blank">
          Keyko
        </Link>
        , Powered by{" "}
        <Link href={neverminedWebsite} target="_blank">
          Nevermined
        </Link>
      </Text>
    </Row>
  );
};
