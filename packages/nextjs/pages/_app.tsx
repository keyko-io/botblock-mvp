import type { AppProps } from "next/app";
import Landing from "./landing";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import { Layout } from "~~/layout/Layout";
import "~~/styles/globals.css";
import { Footer, Header } from "~~/ui";

const App = ({ Component, pageProps, router }: AppProps) => {
  const isLanding = router.pathname === "/";

  return (
    <Layout>
      {isLanding ? (
        <Landing />
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="relative flex flex-col flex-1">
            <Component {...pageProps} />
            <Toaster />
          </main>
          <Footer />
        </div>
      )}
    </Layout>
  );
};

export default App;
