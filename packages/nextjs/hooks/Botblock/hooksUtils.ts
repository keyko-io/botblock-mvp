import * as BotBlockMarketArtifact from "~~/public/artifacts/BotblockMarket.json";

export const ContractsAndAbis = {
  Botblock: {
    address: "0xabe0D51F2f537c14CE782B26Fb3A59EB4A563316",
    abi: BotBlockMarketArtifact.abi,
  },
};

export enum ContractNames {
  BOTBLOCK = "Botblock",
}

export enum BBFunctions {
  CREATE_PLAN = "createPlan",
  GET_ALL_PLANS = "getAllPlans",
  GET_ALL_ORDERS = "getAllOrders",
}
export type UseBBContractWrite = {
  contractName: "Botblock";
  functionName?: string;
};
