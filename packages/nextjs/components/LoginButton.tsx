import { ProfileButton } from "./Header/components/ProfileButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "~~/ui/";

/**
 * Button to be used for connecting user's account
 */

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

LoginButton.displayName = "LoginButton";
