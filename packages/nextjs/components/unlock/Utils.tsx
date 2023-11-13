import { useWeb3AuthContext } from "~~/context/Web3AuthContext";
import { ProfileButton } from "~~/ui/Header/components/ProfileButton";
import { RainbowKitCustomConnectButton } from "~~/ui/Header/components/RainbowKitCustomConnectButton";

export const getTimestampOneMonthFromNow = (): number => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  return currentDate.getTime();
};

export const LoginButton = () => {
  const { isConnected } = useWeb3AuthContext();
  return isConnected ? <ProfileButton /> : <RainbowKitCustomConnectButton />;
};
