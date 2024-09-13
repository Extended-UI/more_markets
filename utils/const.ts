import { type GetBalanceReturnType } from "@wagmi/core";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Permit2Abi } from "@/app/abi/Permit2Abi";

export const contracts = {
  MORE_MARKETS: "0x7EBf3217f8A54De432ACFe6E803576CB859E22a3",
  MORE_IRM: "0x9C1f2140AAbe64ABCfbBeCf1Bdb90022bC7c9052",
  MORE_VAULTS_FACTORY: "0xa738ff722cb86970eddca22e4f06eca62c1c581a",
  MULTICALL3: "0xF7d11c74B5706155d7C6DBe931d590611a371a8a",
  MORE_BUNDLER: "0x817746248Ee90E004A97F70c9F47349AA726D894",
  PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
};

export const tokens: { [key: string]: string } = {
  "0xaca1ab5eb856f7645cd6b9694ba840f3c18bc83e": "USDCf",
  "0x4d40cdce3864ca8fcba1b7de4c0a66f37b28092c": "USDf",
  "0x866e7292a4b9813146591cb6211aac33432cf07f": "BTCf",
  "0x50be444228f6f27899e52e56718c0ae67f962185": "ETHf",
  "0x3d08ce8ba948ddd6ab0745670134a55e8e35aa8c": "ankrf",
  "0xe6de44ac50c1d1c83f67695f6b4820a317285fc6": "wFLOW",
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
