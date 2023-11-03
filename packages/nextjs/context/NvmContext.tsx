import { PropsWithChildren, useEffect, useState } from "react";
import { createCtx } from ".";
import { Account, Nevermined, NeverminedOptions } from "@nevermined-io/sdk";
import { JWTPayload, decodeJwt } from "jose";
import { useAccount, useWalletClient } from "wagmi";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// State variables only
type NvmContextState = {
  provider: any;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
type NvmContext = NvmContextState;

// TODO make so that the user can switch chains
const INITIAL_STATE: NvmContextState = {};

const [useContext, NvmContextProvider] = createCtx<NvmContext>("NvmContext");

export const NvmProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<NvmContextState>(INITIAL_STATE);
  const [nevermined, setNvm] = useState<Nevermined>();
  const [publisher, setPublisher] = useState<Account>();
  const [payload, setPayload] = useState<JWTPayload>();

  const { data: signer } = useWalletClient();
  const connector = wagmiConfig.connector;
  const { address } = useAccount();

  // at connector update, get the provider, initialize nvm and login
  useEffect(() => {
    getProvider();
    initSdk();
    login();
  }, [wagmiConfig.connector]);

  const getProvider = async () => {
    try {
      const p = await connector?.getProvider();
      setState({ ...state, provider: p });
    } catch (error) {
      console.error;
    }
  };

  const initSdk = async () => {
    if (!signer || !state.provider) return;
    const config: NeverminedOptions = {
      // The web3 endpoint of the blockchain network to connect to, could be an Infura endpoint, Quicknode, or any other web3 provider
      web3ProviderUri: "https://goerli-rollup.arbitrum.io/rpc",
      web3Provider: state.provider,
      // web3Provider: provider,
      // The url of the marketplace api if you connect to one. It could be your own service if you run a Marketplace API
      marketplaceUri: "https://marketplace-api.goerli.nevermined.app",
      // The url to a Nevermined node. It could be your own if you run a Nevermined Node
      neverminedNodeUri: "https://node.goerli.nevermined.app",
      // The public address of the above Node
      neverminedNodeAddress: "0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc",
      // The url to access the nevermined subgraphs required to query for on-chain events
      graphHttpUri: "https://api.thegraph.com/subgraphs/name/nevermined-io/public",
      // Folder where are copied the ABIs of the Nevermined Smart Contracts
      artifactsFolder: "http://localhost:3000/artifacts",
      marketplaceAuthToken:
        localStorage.getItem("marketplaceAuthToken") != null
          ? (localStorage.getItem("marketplaceAuthToken") as string)
          : "",
    };
    setNvmConfig(config);
    try {
      const sdk: Nevermined = await Nevermined.getInstance(config);
      setNvm(sdk);
      console.log(await sdk.utils.versions.get());
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      if (!nevermined) return;

      const publisher = await nevermined.accounts.getAccount(address as string);
      setPublisher(publisher);

      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher);
      const loginResult = await nevermined.services.marketplace.login(clientAssertion);
      localStorage.setItem("marketplaceAuthToken", loginResult);
      const payload = decodeJwt(loginResult);
      setPayload(payload);
      console.log("payload", payload);
    } catch (error) {
      console.error;
    }
  };

  return (
    <NvmContextProvider
      value={{
        ...state,
        // initNvm,
      }}
    >
      {children}
    </NvmContextProvider>
  );
};

export const useWeb3AuthContext = useContext;
