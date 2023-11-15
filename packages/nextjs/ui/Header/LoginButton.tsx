import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const LoginButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted, connectModalOpen }) => {
        const connected = mounted && account && chain;
        return connected ? (
          // TODO: tweak this UI
          <Text>Connected</Text>
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
