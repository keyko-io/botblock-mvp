export type Plan = {
  planId?: number | string;
  contentCreator: string;
  paymentTokenAddress: string;
  price: number | string;
  expirationBlock: number | string;
  uri: string;
};

export type Order = {
  buyer: string;
  orderId: string;
  plan: Plan;
  status: number;
};

export enum Token {
  DAI = "DAI",
  USDT = "USDT",
  USDC = "USDC",
  APE = "APE",
  KIT = "KIT",
}
export enum TokenAddress {
  DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC = "0x179522635726710Dd7D2035a81d856de4Aa7836c",
  APE = "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
  KIT = "0x8337E43E0E25eeDFA47b403Bdfe3726b8C1BB59b",
}

export const tokenAddressMap: Record<TokenAddress, Token> = {
  "0x6B175474E89094C44Da98b954EedeAC495271d0F": Token.DAI,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": Token.USDT,
  "0x179522635726710Dd7D2035a81d856de4Aa7836c": Token.USDC,
  "0x4d224452801ACEd8B2F0aebE155379bb5D594381": Token.APE,
  "0x8337E43E0E25eeDFA47b403Bdfe3726b8C1BB59b": Token.KIT,
};
