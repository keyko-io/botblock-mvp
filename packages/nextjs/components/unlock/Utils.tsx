import { ProfileButton } from "../Header/components/ProfileButton";
import { Web3AuthConnectButton } from "../Header/components/Web3AuthConnectButton";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const getTimestampOneMonthFromNow = (): number => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  return currentDate.getTime();
};

export const LoginButton = () => {
  const { isConnected } = useWeb3AuthContext();
  return isConnected ? <ProfileButton /> : <Web3AuthConnectButton />;
};
