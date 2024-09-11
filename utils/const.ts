import { type GetBalanceReturnType } from "@wagmi/core";
import { MarketsAbi } from "@/app/abi/MarketsAbi";

export const contracts = {
  MORE_MARKETS: "0xBdd6B25631Ded904eFcbf1A34c8809bD153f4999",
  MORE_IRM: "0x5F771B0A6D1F19F34a01b4D22AeE28a88D95f5Fc",
  MORE_VAULTS_FACTORY: "0xD614540C05F761686bd4F78DEcF7fdfB3F4DB6C3",
  MULTICALL3: "0xF7d11c74B5706155d7C6DBe931d590611a371a8a",
};

export const tokens: { [key: string]: string } = {
  "0x58f3875DBeFcf784Ea40A886eC24e3C3FaB2dB19": "doge",
  "0xc4dD98f4ECEbFB0F86fF6f8a60668Cf60c45E830": "usdc",
};

export const tokenAddress: { [key: string]: `0x${string}` } = {
  doge: "0x58f3875DBeFcf784Ea40A886eC24e3C3FaB2dB19",
  usdc: "0xc4dD98f4ECEbFB0F86fF6f8a60668Cf60c45E830",
};

export const curators: { [key: string]: string } = {};

export const marketsInstance = {
  address: contracts.MORE_MARKETS as `0x${string}`,
  abi: MarketsAbi,
};

// export const MORE_SUBGRAPH = "http://18.233.102.130:8000/subgraphs/name/more-markets/more-subgraph/graphql";

export const MORE_SUBGRAPH =
  "http://localhost:8000/subgraphs/name/more-markets/more-subgraph";

export const initBalance: GetBalanceReturnType = {
  decimals: 18,
  formatted: "0",
  symbol: "",
  value: BigInt(0),
};
