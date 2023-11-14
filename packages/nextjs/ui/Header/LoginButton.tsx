import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const LoginButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        return connected ? (
          // TODO: tweak this UI
          <Text>Connected</Text>
        ) : (
          <Button onClick={openConnectModal} color="ternary" icon="plus" size="sm">
            Log In
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
