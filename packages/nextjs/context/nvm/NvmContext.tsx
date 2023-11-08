import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { createCtx } from "..";
import { getMetadata } from "./utils";
import {
  Account,
  AssetAttributes,
  AssetPrice,
  CreateProgressStep,
  Nevermined,
  NeverminedOptions,
} from "@nevermined-io/sdk";
import { JWTPayload, decodeJwt } from "jose";
import { useAccount, useWalletClient } from "wagmi";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// State variables only
type NvmContextState = {
  provider: any;
  payload: JWTPayload;
  publisher: Account;
  config: NeverminedOptions;
  isNvmLoading: boolean;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface NvmContext extends NvmContextState {
  loginNevermined: () => Promise<void>;
  publishAsset: (uri: string, price: number | string) => Promise<string | undefined>;
}

const INITIAL_STATE: NvmContextState = {};

const [useContext, NvmContextProvider] = createCtx<NvmContext>("NvmContext");

export const NvmProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<NvmContextState>(INITIAL_STATE);
  const [nevermined, setNvm] = useState<Nevermined>();

  const { data: signer } = useWalletClient();
  const connector = wagmiConfig.connector;
  const { address } = useAccount();

  // at connector update, get the provider, initialize nvm and login

  const getProvider = useCallback(async () => {
    try {
      const provider = await connector?.getProvider();
      setState(prevState => ({ ...prevState, provider, isNvmLoading: true }));
    } catch (error) {
      console.log(error);
    }
  }, [connector]);

  const initSdk = useCallback(async () => {
    if (!state.provider) return;
    const config: NeverminedOptions = {
      web3ProviderUri: "https://goerli-rollup.arbitrum.io/rpc",
      web3Provider: state.provider,
      marketplaceUri: "https://marketplace-api.goerli.nevermined.app",
      neverminedNodeUri: "https://node.goerli.nevermined.app",
      neverminedNodeAddress: "0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc",
      graphHttpUri: "https://api.thegraph.com/subgraphs/name/nevermined-io/public",
      artifactsFolder: "http://localhost:3000/artifacts",
      marketplaceAuthToken:
        localStorage.getItem("marketplaceAuthToken") != null
          ? (localStorage.getItem("marketplaceAuthToken") as string)
          : "",
    };
    try {
      const sdk: Nevermined = await Nevermined.getInstance(config);
      setNvm(sdk);
      console.log(await sdk.utils.versions.get());
      setState(prevState => ({ ...prevState, config, isNvmLoading: false }));
    } catch (error) {
      console.log(error);
    }
  }, [state.provider]);

  const loginNevermined = useCallback(async () => {
    try {
      if (!nevermined) return;

      const publisher = nevermined.accounts.getAccount(address as string);

      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(
        publisher,
        "Please, sign this message to login into Botblock!",
      );
      const loginResult = await nevermined.services.marketplace.login(clientAssertion);
      localStorage.setItem("marketplaceAuthToken", loginResult);
      const payload = decodeJwt(loginResult); // address, iss, exp
      setState(prevState => ({ ...prevState, payload, publisher }));
    } catch (error) {
      console.log(error);
    }
  }, [address, nevermined]);

  const publishAsset = async (uri: string, price: number | string) => {
    try {
      if (!state.publisher || !state.payload) {
        console.log("Publisher or user payload not initialized");
        return;
      }
      const assetPrice = new AssetPrice(state.publisher.getId(), BigInt(price));
      const metadata = getMetadata(undefined, uri);
      metadata.main.name = uri;
      metadata.userId = state.payload?.sub;
      metadata.main.author = state.publisher.getId();

      const assetAttributes = AssetAttributes.getInstance({
        metadata,
        services: [
          {
            serviceType: "access",
            price: assetPrice,
          },
        ],
        providers: state.config?.neverminedNodeAddress ? [state.config?.neverminedNodeAddress] : undefined,
      });
      const steps: CreateProgressStep[] = [];
      const ddo = await nevermined?.assets.create(assetAttributes, state.publisher).next(step => steps.push(step));
      console.log("ddo", ddo, steps);
      return ddo?.id;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initNevermined = async () => await Promise.all([getProvider(), initSdk()]);
    initNevermined();
  }, [getProvider, initSdk]);

  useEffect(() => {
    if (!state.payload) {
      loginNevermined();
    }
  }, [loginNevermined, state.payload]);

  return (
    <NvmContextProvider
      value={{
        ...state,
        loginNevermined,
        publishAsset,
      }}
    >
      {children}
    </NvmContextProvider>
  );
};

export const useNvmContext = useContext;
