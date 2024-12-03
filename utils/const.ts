import { parseEther } from "ethers";
import { type GetBalanceReturnType } from "@wagmi/core";
import { ILeaderDetail, IToken } from "@/types";
import { WETH9Abi } from "@/abi/WETH9Abi";
import { MarketsAbi } from "@/abi/MarketsAbi";
import { BundlerAbi } from "@/abi/BundlerAbi";
import { Permit2Abi } from "@/abi/Permit2Abi";
import { MulticallAbi } from "@/abi/Multicall";
import { LoopStrategyAbi } from "@/abi/LoopStrategyAbi";

export const DayInSec = 24 * 60 * 60;

export const apyDivider = 1e2;
export const WAD = BigInt(1e18);
export const zeroBigInt = BigInt(0);
export const virtualAssets = BigInt(1);
export const moreTolerance = BigInt(100);
export const virtualShares = BigInt(1e6);
export const apyMultiplier = BigInt(1e4);
export const oraclePriceScale = parseEther(WAD.toString());

// set maxAprRangeGap% reduced value of LLTV
export const maxAprRangeGap = 0.05; // 5%

// set Vault's max withdrawable percent per day
export const vaultDailyWithdraw = 10; // 10% of totalSupply

export const contracts = {
  MORE_MARKETS: "0xD6EEb3BD77F9b5eD185cA32526751eC2680AeF06",
  MORE_BUNDLER: "0x5598746A709998F612BaDF3701bf9C8021787ceF",
  WNATIVE: "0xe0fd0a2a4c2e59a479aab0cf44244e355c508766", // wflow
  MULTICALL3: "0xF7d11c74B5706155d7C6DBe931d590611a371a8a",
  PERMIT2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
};

export const tokens: { [key: string]: IToken } = {
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
    symbol: "FLOW",
    name: "FLOW",
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
  value: zeroBigInt,
};

export const initLeaderInfo: ILeaderDetail = {
  supplyUSD: 0,
  borrowUSD: 0,
  collateralUSD: 0,
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

export const wflowInstance = {
  address: contracts.WNATIVE as `0x${string}`,
  abi: WETH9Abi,
};

export const Uint48Max = 281474976710655;

export const gasLimit = "0.8";

export const blacklistedVaults: string[] = [
  "0xeabddabfe3d118092a4bbaf3c13bd923bc8f134e",
];

export const menus = ["Earn", "Borrow", "Leaderboard"];

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

// ******************************************
// for testnet purpose only
// ******************************************
export const vaultIds = [
  "0x077BDDb20C89899d6e9b4aCed43921455154698a",
  "0x8Deddc6488851A4a75EF9dA9f884CFFDa169f2a3",
  "0xB3576f2815d2483Eed702B9393cCfEC4E966c047",
  "0x3f735CdfC0d4eF6ddC0AE0b2B38eB0c38F12baa1",
  "0xBf050fCd883204c388daf0d269048dd8d0dBD16A",
];
export const marketIds = [
  "0x8918b56010e86b248860a9af607da9cb66438592083bf0b82fdbe0fa53b474b8",
  "0xeb086033d468ff4e96ab8f33fb787e4111411825e07a8a4cc2a7b2b2521fd305",
  "0x77e4f314669c84e36178ca7f22ad5c83f80082ab74ba77634740ecd75ba139e6",
  "0xd269d96de2f34e47127b2bffa542b68505aaf82783d6e251fdc98c153c24bf63",
  "0x70a6bb0ecdaa9b52a7349e635ba49cdabb767896fd0f58cdccafdc27713dbea9",
  "0xe8f8af267d9741aeb09413fd98ec09a07de7d5f44875b031447c02db462c71ad",
  "0xab355334f8e8c75a2177e673363e3a89ab5b729e7ca04621aa273eb50fd49147",
  "0x9af516e06fea75cc26bc62c5e416729b14f34c09f7689e1ddc2103698e75ed47",
  "0xf2b57235e82607a9d8bc3786eb3dfc44b015c593b38ea602332dcca0207a6419",
  "0xb81ddce6cf42fa6ebe7a1c2d7664d35d107751f3dc708ffbaf718a1aced66aa0",
  "0x9838533d513912d4462cdb64ee9b8475e7889ec3d563b9deb4e564bac39e99d8",
  "0x1bd9a8690138483c9b8962ec8968abbd847c4d056470f6ba05809920bbf2354d",
];
// ******************************************
// for testnet purpose only
// ******************************************
