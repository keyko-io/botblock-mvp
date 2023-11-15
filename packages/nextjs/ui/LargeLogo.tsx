import { useRouter } from "next/router";
import { Text } from "./Text/Text";
import BotBlockIcon from "~~/public/assets/icons/botblock.svg";
import { coreColors } from "~~/styles/colors";

export const LargeLogo = ({ isLight = false }) => {
  const router = useRouter();
  const browseToHome = () => router.push("/");

  return (
    <button className="flex flex-row items-center gap-2" onClick={browseToHome}>
      <BotBlockIcon height={16} width={16} color={isLight ? coreColors.white : coreColors.black} />
      <Text color={isLight ? "light" : "dark"} type="h3">
        BotBlock | by Keyko powered by NVM
      </Text>
    </button>
  );
};
