import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OPENLOGIN_NETWORK, OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";

const name = "Login with Google";
const iconUrl =
  "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png";
 
//@ts-ignore
export const rainbowWeb3AuthConnector = ({ chains }) => {
  // Create Web3Auth Instance

  const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
  const chainConfig = {
    chainNamespace: "eip155",
    chainId: "0x66eed",
    rpcTarget: "https://goerli-rollup.arbitrum.io/rpc",
    displayName: "Arbitrum Goerli",
    blockExplorer: "https://goerli.arbiscan.io/",
    ticker: "ETH",
    tickerName: "Arbitrum Goerli Ether",
  };

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: CLIENT_ID as string,
    chainConfig: chainConfig as any,
    web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
  });

  // Add openlogin adapter for customisations
  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  const connector = new Web3AuthConnector({
    chains: chains,
    options: {
      web3AuthInstance,
      loginParams: {
        loginProvider: "google",
      },
    },
  });

  return {
    id: "web3auth",
    name,
    iconUrl,
    iconBackground: "#fff",
    createConnector: () => {
      return {
        connector,
      };
    },
  };
};
