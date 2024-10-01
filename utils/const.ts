import { type GetBalanceReturnType } from "@wagmi/core";
import { IToken } from "@/types";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Permit2Abi } from "@/app/abi/Permit2Abi";
import { ApyFeedAbi } from "@/app/abi/ApyFeedAbi";

export const WAD = BigInt(1e18);
export const virtualAssets = BigInt(1);
export const moreTolerance = BigInt(100);
export const virtualShares = BigInt(1e6);
export const oraclePriceScale = BigInt(1e36);

export const contracts = {
  MORE_MARKETS: "0x878Fcd47982aD589A527C1B670Ba39fA6e1733Fb",
  MORE_BUNDLER: "0x75fe8d12098897641e2ca50a9801282af2af5109",
  MORE_VAULTS_FACTORY: "0xB09baEC4B6075aeFB7E576e2F4709755Bc49e298",
  WNATIVE: "0xd3bF53DAC106A0290B0483EcBC89d40FcC961f3e", // wflow
  MULTICALL3: "0x8358d18E99F44E39ea90339c4d6E8C36101f8161",
  PERMIT2: "0x2ce0a0Ac76F9e4Ab49ff0370516D4b23bE7AE46d",
  APY_FEED: "0x266340Dc2bDDCc7D37B1d19412a67e445b6D0E5a",
};

export const tokens: { [key: string]: IToken } = {
  "0x1b97100eA1D7126C4d60027e231EA4CB25314bdb": {
    symbol: "ankr.FLOW",
    name: "ankr.FLOW mock coin",
    decimals: 18,
    oracle: "0xA363e8627b5b4A5DC1cf6b5f228665C5CafF770f",
  },
  "0xd3bF53DAC106A0290B0483EcBC89d40FcC961f3e": {
    symbol: "FLOW",
    name: "FLOW",
    decimals: 18,
    oracle: "0x0a4224D61A53932C920F673fE6c4B70Fb0D54345",
  },
};

export const MORE_SUBGRAPH =
  "https://graph.more.markets/subgraphs/name/more-markets/more-subgraph";

// export const MORE_SUBGRAPH =
//   "http://localhost:8000/subgraphs/name/more-markets/more-subgraph";

export const initBalance: GetBalanceReturnType = {
  decimals: 18,
  formatted: "0",
  symbol: "",
  value: BigInt(0),
};

export const marketsInstance = {
  address: contracts.MORE_MARKETS as `0x${string}`,
  abi: MarketsAbi,
};

export const bundlerInstance = {
  address: contracts.MORE_BUNDLER as `0x${string}`,
  abi: BundlerAbi,
};

export const permit2Instance = {
  address: contracts.PERMIT2 as `0x${string}`,
  abi: Permit2Abi,
};

export const apyfeedInstance = {
  address: contracts.APY_FEED as `0x${string}`,
  abi: ApyFeedAbi,
};

export const Uint48Max = 281474976710655;

export const gasLimit = "0.7";

export const blacklistedVaults = [];

export const enum MoreAction {
  GENERAL = "general",
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BORROW = "borrow",
  BORROW_MORE = "borrow_more",
  ADD_COLLATERAL = "add_collateral",
  WITHDRAW_COLLATERAL = "withdraw_collateral",
  REPAY = "repay",
}

export const sactionedCountries = ["KP", "IR", "MM"];
export const CHAINALYSIS_KEY =
  "39c46c2bd4bf2ef6e1489954b4aa55685a67ec9f8d641d5769f6aeb0c6fbeb57";

// ******************************************
// for testnet purpose only
// ******************************************
export const vaultIds = ["0x8434D9E41C822F4e10AACcc1D777AAcDf9D4BA60"];
export const marketIds = [
  "0xb69f09df3fc268519760e05b4efbb75c1c23ac00d8247712a46199dee3188cfe",
  "0x93c256e9fa38ee67d0b6cd5bac0aae32cc0498d5a1103ba52d41b772b82c2bef",
];
export const curators: { [key: string]: string } = {
  "0xB37a5BA4060D6bFD00a3bFCb235Bb596F13932Bd": "Lighthouse Labs",
};
// ******************************************
// for testnet purpose only
// ******************************************
