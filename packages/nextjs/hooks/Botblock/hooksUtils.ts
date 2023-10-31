import * as BotBlockMarketArtifact from "~~/public/artifacts/BotblockMarket.json";
import * as ERC20Artifact from "~~/public/artifacts/ERC20.json";

export const ContractsAndAbis = {
  Botblock: {
    address: "0xabe0D51F2f537c14CE782B26Fb3A59EB4A563316",
    abi: BotBlockMarketArtifact.abi,
  },
  KIT: {
    address: "0x8337E43E0E25eeDFA47b403Bdfe3726b8C1BB59b",
    abi: ERC20Artifact.abi,
  },
};

export enum ContractNames {
  BOTBLOCK = "Botblock",
  KIT = "KIT",
}

export enum BBFunctions {
  CREATE_PLAN = "createPlan",
  GET_ALL_PLANS = "getAllPlans",
  GET_ALL_ORDERS = "getAllOrders",
  PLACE_ORDER = "placeOrder",
}
export enum ERC20Functions {
  APPROVE = "approve",
}
export type UseBBContractWrite = {
  contractName: "Botblock" | "KIT";
  functionName?: string;
  args?: any[]
};
