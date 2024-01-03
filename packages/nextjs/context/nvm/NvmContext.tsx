import { PropsWithChildren, useEffect, useState } from "react";
import { createCtx } from "..";
import { getMetadata } from "./utils";
import {
  Account,
  AssetAttributes,
  AssetPrice,
  CreateProgressStep,
  Nevermined,
  NeverminedOptions,
  QueryResult,
  SearchQuery,
} from "@nevermined-io/sdk";
import { JWTPayload, decodeJwt } from "jose";
import { useAccount } from "wagmi";
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
  loginNevermined: (address: string, nevermined: Nevermined) => Promise<void>;
  publishAsset: (uri: string, price: number | string) => Promise<string | undefined>;
  queryAssets: (q?: SearchQuery) => Promise<QueryResult>;
}

const INITIAL_STATE = {} as NvmContextState;

const [useContext, NvmContextProvider] = createCtx<NvmContext>("NvmContext");

export const NvmProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<NvmContextState>(INITIAL_STATE);
  const [nevermined, setNevermined] = useState<Nevermined>();

  const connector = wagmiConfig.connector;
  const { address } = useAccount();

  const initSdk = async (web3Provider: any) => {
    const config: NeverminedOptions = {
      web3Provider,
      web3ProviderUri: "https://goerli-rollup.arbitrum.io/rpc",
      marketplaceUri: "https://marketplace-api.goerli.nevermined.app",
      neverminedNodeUri: "https://node.goerli.nevermined.app",
      // neverminedNodeUri: "http://localhost:8030", // Use this when running the NVM Node Fork locally
      neverminedNodeAddress: "0x5838B5512cF9f12FE9f2beccB20eb47211F9B0bc",
      // neverminedNodeAddress: "0x068ed00cf0441e4829d9784fcbe7b9e26d4bd8d0", // Use this when running the NVM Node Fork locally
      graphHttpUri: "https://api.thegraph.com/subgraphs/name/nevermined-io/public",
      artifactsFolder: "./artifacts",
      // artifactsFolder: "http://localhost:3000/artifacts", // Use this when running the NVM Node Fork locally
      marketplaceAuthToken:
        localStorage.getItem("marketplaceAuthToken") != null
          ? (localStorage.getItem("marketplaceAuthToken") as string)
          : "",
    };
    try {
      const sdk: Nevermined = await Nevermined.getInstance(config);
      setNevermined(sdk);
      console.log(await sdk.utils.versions.get());
      setState(prevState => ({ ...prevState, config }));
    } catch (error) {
      console.log(error);
    }
  };

  const loginNevermined = async (address: string, nevermined: Nevermined) => {
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
  };

  const queryAssets = async (q?: SearchQuery) => {
    try {
      const filter: unknown[] = [
        { match: { "service.type": "metadata" } },
        {
          match: {
            "service.attributes.main.nftType": "nft1155-credit",
          },
        },
        // AssetType === 'asset'
        {
          bool: {
            must_not: [
              {
                match: {
                  "service.attributes.main.type": "subscription",
                },
              },
            ],
          },
        },
      ];
      const mustArray: unknown[] = [
        {
          nested: {
            path: ["service"],
            query: {
              bool: {
                filter,
              },
            },
          },
        },
      ];
      const queryMetadata = await nevermined?.services.metadata.queryMetadata(
        q ??
          ({
            query: {
              bool: {
                must: mustArray,
              },
            },
            sort: {
              created: "desc",
            },
          } as SearchQuery),
      );
      return queryMetadata ?? ({} as QueryResult);
    } catch (error) {
      console.error(error);
      return {} as QueryResult;
    }
  };

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

  // at connector update, get the provider, initialize nvm and login
  useEffect(() => {
    const getProvider = async () => {
      try {
        const provider = await connector?.getProvider();
        setState(prevState => ({ ...prevState, provider }));
      } catch (error) {
        console.log(error);
      }
    };
    getProvider();
  }, [connector]);

  useEffect(() => {
    if (state.provider) {
      initSdk(state.provider);
    }
  }, [state.provider]);

  useEffect(() => {
    if (!state.payload && address && nevermined) {
      loginNevermined(address, nevermined);
    }
  }, [address, nevermined, state.payload]);

  return (
    <NvmContextProvider
      value={{
        ...state,
        loginNevermined,
        publishAsset,
        queryAssets,
      }}
    >
      {children}
    </NvmContextProvider>
  );
};

export const useNvmContext = useContext;
