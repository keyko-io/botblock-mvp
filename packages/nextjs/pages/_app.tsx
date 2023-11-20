import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";
import { Footer, Header } from "~~/components";
import { Layout } from "~~/layout/Layout";
import Background from "~~/public/assets/images/dark_background.png";
import { palette } from "~~/styles/colors";
import "~~/styles/globals.css";

const BackgroundImage = () => (
  <div
    style={{
      backgroundImage: `url(${Background.src})`,
      backgroundSize: "cover",
      backgroundColor: palette.slate[100],
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    }}
  />
);

const App = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <BackgroundImage />
      <Header />
      <main className="relative flex flex-col flex-1">
        <div style={{ flex: 1 }}>
          <Component {...pageProps} />
        </div>
        <Toaster />
      </main>
      <Footer />
    </div>
  </Layout>
);

export default App;
