import { PropsWithChildren, useEffect, useState } from "react";
import { createCtx } from "..";
import { Account, AssetAttributes, AssetPrice, Nevermined, NeverminedOptions } from "@nevermined-io/sdk";
import { JWTPayload, decodeJwt } from "jose";
import { useAccount, useWalletClient } from "wagmi";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { getMetadata } from "./utils";

// State variables only
type NvmContextState = {
  provider: any;
  payload: JWTPayload;
  publisher: Account;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface NvmContext extends NvmContextState {
  publishAsset: () => Promise<void>;
}

// TODO make so that the user can switch chains
const INITIAL_STATE: NvmContextState = {};

const [useContext, NvmContextProvider] = createCtx<NvmContext>("NvmContext");

export const NvmProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<NvmContextState>(INITIAL_STATE);
  const [nevermined, setNvm] = useState<Nevermined>();
  const [config, setNvmConfig] = useState<NeverminedOptions>();

  const { data: signer } = useWalletClient();
  const connector = wagmiConfig.connector;
  const { address } = useAccount();

  // at connector update, get the provider, initialize nvm and login
  useEffect(() => {
    const startNvm = async () => {
      try {
        await getProvider();
        await initSdk();
        await login();
        await publishAsset();
      } catch (error) {
        console.error(error);
      }
    };

    startNvm();
    // getProvider()
    // initSdk();
    // login();
    // publishAsset(); //That is just for testing. this function should be used in the Confirm component
  }, [wagmiConfig.connector]);

  const getProvider = async () => {
    try {
      const provider = await connector?.getProvider();
      setState(prevState => ({ ...prevState, provider }));
    } catch (error) {
      console.error;
    }
  };

  const initSdk = async () => {
    debugger
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

      const publisher = nevermined.accounts.getAccount(address as string);

      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher);
      const loginResult = await nevermined.services.marketplace.login(clientAssertion);
      localStorage.setItem("marketplaceAuthToken", loginResult);
      const payload = decodeJwt(loginResult);
      debugger
      setState(prevState => ({ ...prevState, payload, publisher }));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 
   * @info That is currently pushing a mock asset
   * @todo Publish asset inserted by user (pass in all the props)
   */
  const publishAsset = async () => {
    try {
      debugger
      const { publisher, payload } = state;
      const assetPrice = new AssetPrice(publisher.getId(), 0n);

      const metadata = getMetadata();
      metadata.main.name = `${metadata.main.name} - ${Math.random()}`;
      metadata.userId = payload?.sub;

      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: "access",
            price: assetPrice,
          },
        ],
        providers: config?.neverminedNodeAddress ? [config?.neverminedNodeAddress] : undefined,
      });
      const steps = [];
      const ddo = await nevermined?.assets.create(assetAttributes, publisher).next(step => steps.push(step));
      console.log("ddo", ddo);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  return (
    <NvmContextProvider
      value={{
        ...state,
        publishAsset,
      }}
    >
      {children}
    </NvmContextProvider>
  );
};

export const useNvmContext = useContext;
