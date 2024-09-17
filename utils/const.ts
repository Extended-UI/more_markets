import { type GetBalanceReturnType } from "@wagmi/core";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Permit2Abi } from "@/app/abi/Permit2Abi";
import { IToken } from "@/types";

export const contracts = {
  MORE_MARKETS: "0x9a9B20fAb58a0fF084e70283E91448bB31d0FAfa",
  MORE_BUNDLER: "0x34596c09bd484e315c9915a2a1aa6b50bc99428a",
  MORE_VAULTS_FACTORY: "0xACBdE7028CC21FD95496e3481AdCe5aDdB3C3B38",
  MULTICALL3: "0xF7d11c74B5706155d7C6DBe931d590611a371a8a",
  PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
};

export const tokens: { [key: string]: IToken } = {
  "0x5e65b6b04fba51d95409712978cb91e99d93ae73": {
    symbol: "USDCf",
    name: "USDCf(USDC) mock coin",
    decimals: 6,
  },
  "0xd7d43ab7b365f0d0789ae83f4385fa710ffdc98f": {
    symbol: "USDf",
    name: "USDf(PYUSD) mock coin",
    decimals: 6,
  },
  "0x208d09d2a6dd176e3e95b3f0de172a7471c5b2d6": {
    symbol: "BTCf",
    name: "BTCf(wBTC) mock coin",
    decimals: 8,
  },
  "0x059a77239dafa770977dd9f1e98632c3e4559848": {
    symbol: "ETHf",
    name: "ETHf(wETH) mock coin",
    decimals: 18,
  },
  "0xe132751ab5a14ac0bd3cb40571a9248ee7a2a9ea": {
    symbol: "ankr.FLOW",
    name: "ankr.FLOW mock coin",
    decimals: 18,
  },
  "0xe0fd0a2a4c2e59a479aab0cf44244e355c508766": {
    symbol: "wFLOW",
    name: "Wrapped FLOW",
    decimals: 18,
  },
};

export const curators: { [key: string]: string } = {
  "0x401d24076331c077099dea08fe898ea7ff7254cd": "Lighthouse Labs",
  "0xa1947019f5989c5c417cc6eece404d684b855bb2": "Lighthouse Labs",
  "0xf3cfc1694ed953764a699dac485cf3ea6e259fa4": "Lighthouse Labs",
  "0xa05a8570c963ff6710281d57d48c4f902ff16f37": "Lighthouse Labs",
  "0xb37a5ba4060d6bfd00a3bfcb235bb596f13932bd": "Lighthouse Labs",
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

export const Uint48Max = 281474976710655;

export const coingecko_ids: { [key in string]: string } = {
  usdc: "usdc",
  bitcoin: "bitcoin",
  ethereum: "ethereum",
  tether: "tether",
  flow: "flow",
  "ankr-network": "ankr-network",
};

export const gasLimit = "0.8";

export const blacklistedVaults = ["0xeabddabfe3d118092a4bbaf3c13bd923bc8f134e"];
