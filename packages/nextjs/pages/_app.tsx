import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Landing from "./landing";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { RobotsProvider } from "~~/context/RobotsContext";
import { Web3AuthProvider } from "~~/context/Web3AuthContext";
import { NvmProvider } from "~~/context/nvm/NvmContext";
import { useNativeCurrencyPrice } from "~~/scaffoldHooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const ScaffoldEthApp = ({ Component, pageProps, router }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();
  const isLanding = router.pathname === "/";

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <Web3AuthProvider>
      <RobotsProvider>
        <WagmiConfig config={wagmiConfig}>
          <NextNProgress />
          <RainbowKitProvider
            chains={appChains.chains}
            avatar={BlockieAvatar}
            theme={isDarkTheme ? darkTheme() : lightTheme()}
          >
            <NvmProvider>
              {isLanding ? (
                <Landing />
              ) : (
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="relative flex flex-col flex-1">
                    <Component {...pageProps} />
                  </main>
                  <Footer />
                </div>
              )}
              <Toaster />
            </NvmProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </RobotsProvider>
    </Web3AuthProvider>
  );
};

export default ScaffoldEthApp;
