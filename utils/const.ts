import { parseEther } from "ethers";
import { type GetBalanceReturnType } from "@wagmi/core";
import { IToken } from "@/types";
import { WETH9Abi } from "@/app/abi/WETH9Abi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Permit2Abi } from "@/app/abi/Permit2Abi";
import { MulticallAbi } from "@/app/abi/Multicall";
import { LoopStrategyAbi } from "@/app/abi/LoopStrategyAbi";

export const apyDivider = 1e2;
export const WAD = BigInt(1e18);
export const virtualAssets = BigInt(1);
export const moreTolerance = BigInt(100);
export const virtualShares = BigInt(1e6);
export const apyMultiplier = BigInt(1e4);
export const oraclePriceScale = parseEther(WAD.toString());

// set maxAprRangeGap% reduced value of LLTV
export const maxAprRangeGap = 0.05; // 5%

export const contracts = {
  MORE_MARKETS: "0x94A2a9202EFf6422ab80B6338d41c89014E5DD72",
  MORE_BUNDLER: "0x1f474e384712cA7EC0dEE3cD9E4c3905dC8beA18",
  WNATIVE: "0xd3bF53DAC106A0290B0483EcBC89d40FcC961f3e", // wflow
  MULTICALL3: "0x8358d18E99F44E39ea90339c4d6E8C36101f8161",
  PERMIT2: "0x2ce0a0Ac76F9e4Ab49ff0370516D4b23bE7AE46d",
  LOOP_STRATEGY: "0xBEe4769E53d1A6BABC4fC2E91F9B730770453bad",
};

export const tokens: { [key: string]: IToken } = {
  "0x1b97100ea1d7126c4d60027e231ea4cb25314bdb": {
    symbol: "ankr.FLOW",
    name: "ankr.FLOW mock coin",
    decimals: 18,
    oracle: "0xA363e8627b5b4A5DC1cf6b5f228665C5CafF770f",
  },
  "0xd3bf53dac106a0290b0483ecbc89d40fcc961f3e": {
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

export const multicallInstance = {
  address: contracts.MULTICALL3 as `0x${string}`,
  abi: MulticallAbi,
};

export const loopstrategyInstance = {
  address: contracts.LOOP_STRATEGY as `0x${string}`,
  abi: LoopStrategyAbi,
};

export const wflowInstance = {
  address: contracts.WNATIVE as `0x${string}`,
  abi: WETH9Abi,
};

export const Uint48Max = 281474976710655;

export const gasLimit = "0.7";

export const blacklistedVaults: string[] = [];

export const enum MoreAction {
  GENERAL = "general",
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  BORROW = "borrow",
  BORROW_MORE = "borrow_more",
  ADD_COLLATERAL = "add_collateral",
  WITHDRAW_COLLATERAL = "withdraw_collateral",
  REPAY = "repay",
  CLAIM = "claim",
  LOOP_DEPOSIT = "loop_deposit",
  LOOP_WITHDRAW = "loop_withdraw",
}

export const sactionedCountries = ["KP", "IR", "MM"];
export const CHAINALYSIS_KEY =
  "39c46c2bd4bf2ef6e1489954b4aa55685a67ec9f8d641d5769f6aeb0c6fbeb57";

export const vaultIds = [
  "0xe2aaC46C1272EEAa49ec7e7B9e7d34B90aaDB966",
  "0x8c921f740B0065C7cE28EB93c7056d92C4735E7b",
];
export const marketIds = [
  "0x3dca1854528f8a9bff744889198eb07ceacdfe25937450965e62103cefc69aa5",
  "0x2ae0c40dc06f58ff0243b44116cd48cc4bdab19e2474792fbf1f413600ceab3a",
];
export const curators: { [key: string]: string } = {
  "0xb37a5ba4060d6bfd00a3bfcb235bb596f13932bd": "Tentacle Labs",
};
// ******************************************
// for testnet purpose only
// ******************************************
