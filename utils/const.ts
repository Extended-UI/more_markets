import { type GetBalanceReturnType } from "@wagmi/core";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Permit2Abi } from "@/app/abi/Permit2Abi";

export const contracts = {
  MORE_MARKETS: "0xBdd6B25631Ded904eFcbf1A34c8809bD153f4999",
  MORE_IRM: "0x5F771B0A6D1F19F34a01b4D22AeE28a88D95f5Fc",
  MORE_VAULTS_FACTORY: "0xD614540C05F761686bd4F78DEcF7fdfB3F4DB6C3",
  MULTICALL3: "0xF7d11c74B5706155d7C6DBe931d590611a371a8a",
  MORE_BUNDLER: "0x817746248Ee90E004A97F70c9F47349AA726D894",
  PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
};

export const tokens: { [key: string]: string } = {
  "0x58f3875dbefcf784ea40a886ec24e3c3fab2db19": "doge",
  "0xc4dd98f4ecebfb0f86ff6f8a60668cf60c45e830": "usdc",
  "0x1a9a8787b95871233d2421067b60af17cf44cd4f": "ripple",
  "0xf1107a71103398641c899f0c2d9515d1cb3761b3": "usdt",
};

export const curators: { [key: string]: string } = {};

export const MORE_SUBGRAPH =
  "https://graph.more.markets/subgraphs/name/more-markets/more-subgraph";

// export const MORE_SUBGRAPH = "http://localhost:8000/subgraphs/name/more-markets/more-subgraph";

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

export const Uint48Max = 281474976710655;
