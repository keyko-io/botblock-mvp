import Image from "next/image";
import { useRouter } from "next/router";

const BotBlockLogo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push("/")} className="flex items-center space-x-2 text-white cursor-pointer">
      <Image height={24} width={24} src={"/assets/icons/botblock.svg"} alt="Bot block logo" />
      <h3>BotBlock | by Keyko powered by NVM</h3>
    </div>
  );
};

export default BotBlockLogo;
