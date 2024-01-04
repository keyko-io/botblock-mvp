import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Text } from "~~/ui";

//import BotBlockIcon from "~~/public/assets/icons/botblock.svg";
//import { coreColors } from "~~/styles/colors";

export const LargeLogo = ({ isLight = false }) => {
  const router = useRouter();
  const browseToHome = () => router.push("/");

  const browseToKeyko = () => window.open("https://www.keyko.io");
  const browseToNevermined = () => window.open("https://www.nevermined.io");

  return (
    <Row className="">
      <div style={{ width: "30px", marginBottom: "5px" }}>
        <Link href="/">
          <Image alt="BotBlock" height="30" width="30" src="/assets/icons/botblock.png"></Image>
        </Link>
      </div>
      {/*
      <BotBlockIcon
        onClick={browseToHome}
        height={16}
        width={16}
        color={isLight ? coreColors.white : coreColors.black}
        cursor="pointer"
      />
      */}
      <Text color={isLight ? "light" : "dark"} type="h3-hyperlink" as="button" onClick={browseToHome}>
        {"\xa0BotBlock"}
      </Text>
      <Text color={isLight ? "light" : "dark"} type="h3">
        {"\xa0| Built by\xa0"}
      </Text>
      <Text color={isLight ? "light" : "dark"} type="h3-hyperlink" onClick={browseToKeyko}>
        {"Keyko"}
      </Text>
      <Text color={isLight ? "light" : "dark"} type="h3">
        {", Powered by\xa0"}
      </Text>
      <Text color={isLight ? "light" : "dark"} type="h3-hyperlink" as="button" onClick={browseToNevermined}>
        {"Nevermined"}
      </Text>
    </Row>
  );
};
