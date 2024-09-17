import { IToken, MarketParams } from "@/types";
import { formatUnits } from "ethers";
import { coingecko_ids, tokens } from "./const";

export const getVaule = (param: any): string => {
  return param.result ? param.result.toString() : "";
};

export const getVauleNum = (param: any): number => {
  return param.result ? Number(param.result.toString()) : 0;
};

export const getVauleBigint = (param: any, ind: number): bigint => {
  return param.result ? BigInt(param.result[ind]) : BigInt(0);
};

export const getVauleBoolean = (param: any, ind: number): boolean => {
  return param.result ? param.result[ind] : false;
};

export const getVauleString = (param: any, ind: number): string => {
  return param.result ? param.result[ind].toString() : "";
};

export const getVauleBigintList = (param: any, ind: number): bigint[] => {
  return param.result ? (param.result[ind] as bigint[]) : [];
};

export const getTimestamp = (): bigint => {
  // added 1 hour
  return BigInt(Math.floor(Date.now() / 1000)) + BigInt(3600);
};

export const getTokenPrice = async (token: string): Promise<number> => {
  try {
    const tokenId = coingecko_ids[token];
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=" +
        tokenId +
        "&vs_currencies=usd"
    );
    if (response.status != 200) return 0;
    const data = await response.json();
    if (!data) return 0;
    return data[tokenId].usd ? data[tokenId].usd : 0;
  } catch {
    return 0;
  }
};

export const getTokenInfo = (token: string | undefined): IToken => {
  const initVal = {
    name: "",
    symbol: "",
    decimals: 18,
  };

  if (token) {
    const tokenAddress =
      token == "wflow" ? "0xe0fd0a2a4c2e59a479aab0cf44244e355c508766" : token;
    const tokenInfo = tokens[tokenAddress.toLowerCase()];

    return tokenInfo ? tokenInfo : initVal;
  }

  return initVal;
};

export const formatTokenValue = (
  amount: bigint,
  token: string,
  decimals?: number
): number => {
  return Number(
    formatUnits(amount, decimals ? decimals : getTokenInfo(token).decimals)
  );
};

export const getPremiumLltv = (params: MarketParams): number | null => {
  return params.isPremiumMarket && params.categoryLltv.length > 0
    ? formatTokenValue(
        params.categoryLltv[params.categoryLltv.length - 1],
        "",
        18
      )
    : null;
};
