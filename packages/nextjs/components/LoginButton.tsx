import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Button } from "~~/ui/";

/**
 * Button to be used for connecting user's account
 */

export const LoginButton = () => {
  const { connectModalOpen, openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  return openConnectModal ? (
    <Button
      onClick={openConnectModal}
      disabled={connectModalOpen || isConnected}
      color="ternary"
      icon={connectModalOpen ? undefined : "plus"}
      size="lg"
    >
      {connectModalOpen ? "Logging in..." : isConnected ? "Logged In" : "Log In"}
    </Button>
  ) : null;
};

LoginButton.displayName = "LoginButton";
