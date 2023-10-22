import { PropsWithChildren, useState } from "react";
import { createCtx } from ".";
import { Plan } from "./Types";
import { Web3Provider } from "@ethersproject/providers";
import { Web3Auth } from "@web3auth/modal";
import { Signer, ethers } from "ethers";
import toast from "react-hot-toast";
import { subsContract as rawContract, erc20contract as rawErc20 } from "~~/public/artifacts";
import { BotblockMarket, ERC20 } from "~~/types/typechain-types";

const CLIENT_ID = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;
const SUBS_CONTRACT_ADDRESS = "0xabe0D51F2f537c14CE782B26Fb3A59EB4A563316";

// State variables only
type Web3AuthContextState = {
  web3Auth: Web3Auth;
  provider?: Web3Provider;
  isConnected?: boolean;
  address?: string;
  username?: string;
  email?: string;
  subsContract?: BotblockMarket;
  connectedSubsContract?: BotblockMarket;
  plan?: Plan;
};

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface Web3AuthContext extends Web3AuthContextState {
  connectWeb3Auth: () => Promise<void>;
  disconnectWeb3Auth: () => Promise<void>;
  getPlans: () => Promise<Plan[] | undefined>;
  initProvider: () => Promise<void>;
  initWeb3Auth: () => Promise<void>;
  purchasePlan: (planId: string | number, price: number, tokenAddress: string) => Promise<void>;
  setPlanData: (plan: Plan) => void;
}

// TODO make so that the user can switch chains
const INITIAL_STATE: Web3AuthContextState = {
  web3Auth: new Web3Auth({
    clientId: CLIENT_ID ?? "",
    web3AuthNetwork: "sapphire_devnet", // Web3Auth Network
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x66eed",
      rpcTarget: "https://goerli-rollup.arbitrum.io/rpc",
      displayName: "Arbitrum Goerli",
      blockExplorer: "https://goerli.arbiscan.io/",
      ticker: "ETH",
      tickerName: "Arbitrum Goerli Ether",
    },
  }),
};

const [useContext, Web3AuthContextProvider] = createCtx<Web3AuthContext>("Web3AuthContext");

export const Web3AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<Web3AuthContextState>(INITIAL_STATE);

  const initWeb3Auth = async () => {
    await state?.web3Auth.initModal();
  };

  const initProvider = async () => {
    const provider = new ethers.providers.JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");
    const subsContract = new ethers.Contract(SUBS_CONTRACT_ADDRESS, rawContract.abi, provider) as BotblockMarket;
    setState(prevState => ({ ...prevState, subsContract }));
  };

  const connectWeb3Auth = async () => {
    const web3authProvider = await state.web3Auth.connect();
    const userInfo = await state.web3Auth.getUserInfo();
    if (!web3authProvider) return;
    const provider = new ethers.providers.Web3Provider(web3authProvider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const subsContract = new ethers.Contract(SUBS_CONTRACT_ADDRESS, rawContract.abi, signer) as BotblockMarket;
    const connectedSubsContract = subsContract.connect(signer);
    setState(prevState => ({
      ...prevState,
      provider,
      isConnected: true,
      username: userInfo.name,
      email: userInfo.email,
      subsContract,
      connectedSubsContract,
      address,
    }));

    //just for testing
    // const address = await signer.getAddress();
    // const balance = ethers.utils.formatEther(
    //   await provider.getBalance(address), // Balance is in wei
    // );
    // console.log("ADDRESS", address);
    // console.log("BALANCE", balance);
  };

  const getPlans = async () => {
    if (state.subsContract) {
      const plans = await state.subsContract.getAllPlans();
      // Map plan struct output into a usable array
      return plans.map(plan => ({
        contentCreator: plan.contentCreator,
        expirationBlock: plan.expirationBlock.toString(),
        planId: plan.planID.toString(),
        paymentTokenAddress: plan.paymentTokenAddress,
        price: plan.price.toString(),
        uri: plan.uri,
      })) as Plan[];
    }
  };

  const purchasePlan = async (planId: string | number, price: number, tokenAddress: string) => {
    try {
      if (state.connectedSubsContract && state.address) {
        await approveSpending(tokenAddress, price);
        await state.connectedSubsContract.placeOrder(planId, price);
        toast.success("Successfully purchased");
      }
    } catch (error) {
      toast.error("The purchaase could not be done. Are you sure you have enoguh tokens to make it?");
    }
  };

  const disconnectWeb3Auth = async () => {
    await state.web3Auth.logout();
    setState(prevState => ({ ...prevState, isConnected: false }));
  };

  const setPlanData = (plan: Plan) => {
    setState(prevState => ({ ...prevState, plan }));
  };

  const approveSpending = async (tokenAddress: string, amount: number) => {
    try {
      const approvalAmount = ethers.utils.parseEther(amount.toString()); // Convert amount to Wei
      const signer = state.provider?.getSigner();

      const ERC20TokenContract = new ethers.Contract(tokenAddress, rawErc20.abi, state.provider) as ERC20;
      const connected = ERC20TokenContract.connect(signer as Signer);

      // Call the approve function on your ERC-20 token contract
      const tx = await connected.approve(SUBS_CONTRACT_ADDRESS, approvalAmount);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Web3AuthContextProvider
      value={{
        ...state,
        connectWeb3Auth,
        disconnectWeb3Auth,
        getPlans,
        initProvider,
        initWeb3Auth,
        purchasePlan,
        setPlanData,
      }}
    >
      {children}
    </Web3AuthContextProvider>
  );
};

export const useWeb3AuthContext = useContext;
