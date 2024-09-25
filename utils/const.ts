import { ZeroAddress } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { type GetBalanceReturnType } from "@wagmi/core";
import { IToken } from "@/types";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Permit2Abi } from "@/app/abi/Permit2Abi";

export const virtualAssets = BigInt(1);
export const virtualShares = BigInt(1e6);
export const oraclePriceScale = BigInt(1e36);
export const WAD = BigInt(1e18);

export const contracts = {
  MORE_MARKETS: "0x9a9B20fAb58a0fF084e70283E91448bB31d0FAfa",
  MORE_BUNDLER: "0x34596c09bd484e315c9915a2a1aa6b50bc99428a",
  MORE_VAULTS_FACTORY: "0xACBdE7028CC21FD95496e3481AdCe5aDdB3C3B38",
  WNATIVE: "0xe0fd0a2a4c2e59a479aab0cf44244e355c508766", // wflow
  MULTICALL3: "0xF7d11c74B5706155d7C6DBe931d590611a371a8a",
  PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
};

export const tokens: { [key: string]: IToken } = {
  [ZeroAddress]: {
    symbol: "FLOW",
    name: "FLOW",
    decimals: 18,
    oracle: "",
  },
  "0x5e65b6b04fba51d95409712978cb91e99d93ae73": {
    symbol: "USDCf",
    name: "USDCf(USDC) mock coin",
    decimals: 6,
    oracle: "0xBEfB2b2B48fdEece45253b2eD008540a23d25AFE",
  },
  "0xd7d43ab7b365f0d0789ae83f4385fa710ffdc98f": {
    symbol: "USDf",
    name: "USDf(PYUSD) mock coin",
    decimals: 6,
    oracle: "0x2e9EcBf2D63094A08c9ff5eb20A4EbBFfBFc12eD",
  },
  "0x208d09d2a6dd176e3e95b3f0de172a7471c5b2d6": {
    symbol: "BTCf",
    name: "BTCf(wBTC) mock coin",
    decimals: 8,
    oracle: "0xe65b5154aE462fD08faD32B2A85841803135894b",
  },
  "0x059a77239dafa770977dd9f1e98632c3e4559848": {
    symbol: "ETHf",
    name: "ETHf(wETH) mock coin",
    decimals: 18,
    oracle: "0x2b40Fc7326E3bF1DB3571e414d006Ee42d49C427",
  },
  "0xe132751ab5a14ac0bd3cb40571a9248ee7a2a9ea": {
    symbol: "ankr.FLOW",
    name: "ankr.FLOW mock coin",
    decimals: 18,
    oracle: "0x017efB6272Dc61DCcfc9a757c29Fd99187c9d208",
  },
  "0xe0fd0a2a4c2e59a479aab0cf44244e355c508766": {
    symbol: "wFLOW",
    name: "Wrapped FLOW",
    decimals: 18,
    oracle: "0xaCAd8eB605A93b8E0fF993f437f64155FB68D5DD",
  },
};

export const faucetAmounts = ["1000", "1000", "0.1", "1", "1000", "1000"];

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

export const gasLimit = "0.8";

export const blacklistedVaults = ["0xeabddabfe3d118092a4bbaf3c13bd923bc8f134e"];

export const errorDecoder = ErrorDecoder.create();
export const errMessages = {
  invalid_amount: "Invalid amount",
};

// ******************************************
export const vaultIds = [
  "0x8C1CEc925beB7944941b612B70aE280C984FA633",
  "0x6dCbc5E23Aab3CBb702974D5cDb3837dc0b2e9D6",
  "0x5c53Fe805381e588Aa17dA5a0635edc4D4bab8DF",
  "0x60e72F2D276619115a11BFb3Cf89B2f28432887E",
  "0xAe631435Fc9096047Bc2698c705382F4DA94663B",
];
export const marketIds = [
  "0x6bed9b33d3ee7142f53ba4cf930d61e4aff25a4677150cfe354e9b75a2ee2547",
  "0x75a964099ef99a0c7dc893c659a4dec8f6beeb3d7c9705e28df7d793694b6164",
  "0x0f0de7ddadc86a7be1a3d3e1a9d2e8090a791299bcf0985626ae4ebd65add87e",
  "0xa60293202460d7df68151ac06ec00f6b3dfb5ff119ca579107673bd843547875",
  "0x0f510c5cca1c8b24bbbccb04833d1243dcb4e6ae07e4f39397dbd9fa6534dece",
  "0x16893ff750ddec34e292a65a8cb6a014627b3f4ad0b2b82c6da4cc28d1e0576d",
  "0x19993995e633d686a7a7a4db10d363c2f6dddc744f3ec31e6f8f12d6344bc25d",
  "0x81721c60cf152bf1395d9c1cae5ab87453bba99636c4a3e3f985570e4a7bcb7c",
  "0xbb1c25a3dd81910d745b07e0926dc1cc7be6f09c2c5cc025c0d581e44c21c67f",
  "0x595199e0d78e7769da797d595abf4801bf0ed2bedd0e745a24bb4aebc0310e53",
  "0x65e3819781cfb3d6865688fe41757484af047fc1aeaca1752b0bf4cacaae555c",
  "0xaccc9ce078cc2228bc0a0328b0f207311a9dcdfd96d7e34ac829a38e8af953d1",
];
// ******************************************
