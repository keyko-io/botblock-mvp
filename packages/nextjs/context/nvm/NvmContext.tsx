import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { createCtx } from "..";
import { Account, Nevermined, NeverminedOptions } from "@nevermined-io/sdk";
import { JWTPayload, decodeJwt } from "jose";
import { useAccount, useWalletClient } from "wagmi";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// State variables only
type NvmContextState = {
  provider: any;
  payload: JWTPayload;
  publisher: Account;
  config: NeverminedOptions;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface NvmContext extends NvmContextState {
  login: () => Promise<void>;
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
      setState(prevState => ({ ...prevState, provider }));
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
    setState(prevState => ({ ...prevState, config }));
    try {
      const sdk: Nevermined = await Nevermined.getInstance(config);
      setNvm(sdk);
      console.log(await sdk.utils.versions.get());
    } catch (error) {
      console.log(error);
    }
  }, [state.provider]);

  const login = useCallback(async () => {
    try {
      if (!nevermined) return;

      const publisher = nevermined.accounts.getAccount(address as string);

      const clientAssertion = await nevermined.utils.jwt.generateClientAssertion(publisher);
      const loginResult = await nevermined.services.marketplace.login(clientAssertion);
      localStorage.setItem("marketplaceAuthToken", loginResult);
      const payload = decodeJwt(loginResult);
      setState(prevState => ({ ...prevState, payload, publisher }));
    } catch (error) {
      console.log(error);
    }
  }, [address, nevermined]);

  useEffect(() => {
    const initNevermined = async () => await Promise.all([getProvider(), initSdk()]);
    initNevermined();
  }, [getProvider, initSdk]);

  return (
    <NvmContextProvider
      value={{
        ...state,
        login,
      }}
    >
      {children}
    </NvmContextProvider>
  );
};

export const useNvmContext = useContext;
