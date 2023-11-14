import type { AppProps } from "next/app";
import Landing from "./landing";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "~~/layout/Providers";
import "~~/styles/globals.css";
import { Footer, Header } from "~~/ui";

const App = ({ Component, pageProps, router }: AppProps) => {
  const isLanding = router.pathname === "/";

  return (
    <Providers>
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
    </Providers>
  );
};

export default App;
