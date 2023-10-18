import { PropsWithChildren, useState } from "react";
import { createCtx } from ".";
import { Web3Auth } from "@web3auth/modal";

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

// State variables only
type Web3AuthContextState = {
  isConnected?: boolean;
  username?: string;
  web3Auth: Web3Auth;
  email?: string;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface Web3AuthContext extends Web3AuthContextState {
  connectWeb3Auth: () => Promise<void>;
  disconnectWeb3Auth: () => Promise<void>;
  initWeb3Auth: () => Promise<void>;
}

const INITIAL_STATE: Web3AuthContextState = {
  web3Auth: new Web3Auth({
    clientId: CLIENT_ID ?? "",
    web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth",
      displayName: "Ethereum Devnet",
      blockExplorer: "https://goerli.etherscan.io",
      ticker: "ETH",
      tickerName: "Ethereum",
    },
  }),
};

const [useContext, Web3AuthContextProvider] = createCtx<Web3AuthContext>("Web3AuthContext");

export const Web3AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<Web3AuthContextState>(INITIAL_STATE);

  const initWeb3Auth = async () => {
    await state?.web3Auth.initModal();
  };

  const connectWeb3Auth = async () => {
    await state.web3Auth.connect();
    const userInfo = await state.web3Auth.getUserInfo();
    setState(prevState => ({ ...prevState, isConnected: true, username: userInfo.name, email: userInfo.email }));
  };

  const disconnectWeb3Auth = async () => {
    await state.web3Auth.logout();
    setState(prevState => ({ ...prevState, isConnected: false }));
  };

  return (
    <Web3AuthContextProvider value={{ ...state, connectWeb3Auth, disconnectWeb3Auth, initWeb3Auth }}>
      {children}
    </Web3AuthContextProvider>
  );
};

export const useWeb3AuthContext = useContext;
