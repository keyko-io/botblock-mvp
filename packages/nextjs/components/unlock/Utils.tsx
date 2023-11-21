import { RainbowKitCustomConnectButton } from "~~/components/Header/components/RainbowKitCustomConnectButton";
import { ProfileButton } from "~~/components/UserButton/components/ProfileButton";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const getTimestampOneMonthFromNow = (): number => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  return currentDate.getTime();
};

export const LoginButton = () => {
  const { isConnected } = useWeb3AuthContext();
  return isConnected ? <ProfileButton /> : <RainbowKitCustomConnectButton />;
};
