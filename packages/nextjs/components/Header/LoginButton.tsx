import { ProfileButton } from "./components/ProfileButton";
import { Web3AuthConnectButton } from "./components/Web3AuthConnectButton";
import { useWeb3AuthContext } from "~~/context/Web3AuthContext";

export const LoginButton = () => {
  const { isConnected } = useWeb3AuthContext();
  return isConnected ? <ProfileButton /> : <Web3AuthConnectButton />;
};
