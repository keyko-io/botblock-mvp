import { LoginButton } from "../LoginButton";
import { ProfileButton } from "./components/ProfileButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const UserButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const isConnected = mounted && !!account && !!chain;
        return isConnected ? <ProfileButton name={account.ensName ?? account.displayName} /> : <LoginButton />;
      }}
    </ConnectButton.Custom>
  );
};

UserButton.displayName = "UserButton";
