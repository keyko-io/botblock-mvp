import { Button } from "../Button/Button";
import { ProfileButton } from "./components/ProfileButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const LoginButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted, connectModalOpen }) => {
        const connected = mounted && account && chain;
        return connected ? (
          <ProfileButton name={account.ensName ?? account.displayName} />
        ) : (
          <Button
            onClick={openConnectModal}
            disabled={connectModalOpen}
            color="ternary"
            icon={connectModalOpen ? undefined : "plus"}
            size="lg"
          >
            {connectModalOpen ? "Logging in..." : "Log In"}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
