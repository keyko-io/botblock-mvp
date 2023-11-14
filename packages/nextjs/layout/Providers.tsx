import { PropsWithChildren } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { RobotsProvider } from "~~/context/RobotsContext";
import { Web3AuthProvider } from "~~/context/Web3AuthContext";
import { NvmProvider } from "~~/context/nvm/NvmContext";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

export const Providers = ({ children }: PropsWithChildren) => (
  <Web3AuthProvider>
    <RobotsProvider>
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
          <NvmProvider>
            {children}
            <Toaster />
          </NvmProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </RobotsProvider>
  </Web3AuthProvider>
);
