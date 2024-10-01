import { toast } from "react-toastify";
import { formatUnits, ZeroAddress } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { MoreErrors } from "@/utils/errors";
import {
  GraphVault,
  IToken,
  MarketInfo,
  MarketParams,
  IVaultApr,
  IMarketApr,
} from "@/types";
import {
  tokens,
  curators,
  contracts,
  virtualAssets,
  virtualShares,
  WAD,
  moreTolerance,
  MoreAction,
} from "./const";

const errorDecoder = ErrorDecoder.create();

export const notify = (errMsg: string) => errMsg.length > 0 && toast(errMsg);

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

export const getTokenInfo = (token: string | undefined): IToken => {
  const initVal = {
    name: "",
    symbol: "",
    decimals: 18,
    oracle: "",
  };

  if (token) {
    const tokenAddress = token == "wflow" ? contracts.WNATIVE : token;
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
    formatUnits(
      amount,
      decimals && decimals > 0 ? decimals : getTokenInfo(token).decimals
    )
  );
};

export const formatNumberLocale = (
  numValue: number,
  maxFranction: number = 2
): string => {
  const actualFraction = numValue > 0.01 ? 2 : maxFranction;
  return numValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: actualFraction,
  });
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

export const getAvailableLiquidity = (
  info: MarketInfo,
  token: string
): number => {
  return formatTokenValue(
    info.totalSupplyAssets - info.totalBorrowAssets,
    token
  );
};

export const formatCurator = (fetchedVault: GraphVault): string => {
  return fetchedVault.curator && fetchedVault.curator.id != ZeroAddress
    ? curators[fetchedVault.curator.id.toLowerCase()]
    : "";
};

export const notifyError = async (
  err: unknown,
  moreAction: MoreAction = MoreAction.GENERAL
) => {
  const decodedError = await errorDecoder.decode(err);
  const parsedError = decodedError.reason
    ? // ? decodedError.reason.split("\n")[0]
      decodedError.reason
    : "";
  const filteredIndex =
    parsedError.length > 0
      ? MoreErrors.findIndex((item) =>
          parsedError.toLowerCase().includes(item.error.toLowerCase())
        )
      : -1;

  let errMsg = "";
  if (filteredIndex >= 0) {
    errMsg = MoreErrors[filteredIndex].message;
  } else {
    const filteredError = MoreErrors.find(
      (moreError) => moreError.action == moreAction
    );
    errMsg = filteredError ? filteredError.message : "";
  }

  notify(errMsg);
};

export const toAssetsUp = (
  shares: bigint,
  totalAssets: bigint,
  totalShares: bigint
): bigint => {
  return mulDivUp(
    shares,
    totalAssets + virtualAssets,
    totalShares + virtualShares
  );
};

export const mulDivUp = (x: bigint, y: bigint, d: bigint): bigint => {
  return (x * y + (d - BigInt(1))) / d + moreTolerance;
};

export const mulDivDown = (x: bigint, y: bigint, d: bigint): bigint => {
  return (x * y) / d;
};

export const wMulDown = (
  x: bigint,
  y: bigint,
  supplyDecimals: number,
  loanDecimals: number
) => {
  const newWAD =
    supplyDecimals >= loanDecimals
      ? WAD * BigInt(18 ** (supplyDecimals - loanDecimals))
      : WAD / BigInt(18 ** (supplyDecimals - loanDecimals));
  const returnVal = mulDivDown(x, y, newWAD);
  return returnVal > moreTolerance ? returnVal - moreTolerance : BigInt(0);
};

export const fetchVaultAprs = async (
  targetDate: number,
  vaultAddress: string = ""
): Promise<IVaultApr[]> => {
  const fetchResult = await fetch(
    "/api/vaultapr?targetDate=" + targetDate + "&vaultid=" + vaultAddress,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const vaultAprList = await fetchResult.json();
  return vaultAprList.vaultaprs;
};

export const fetchMarketAprs = async (
  targetDate: number,
  marketid: string = ""
): Promise<IMarketApr[]> => {
  const fetchResult = await fetch(
    "/api/marketapr?targetDate=" + targetDate + "&marketid=" + marketid,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const marketAprList = await fetchResult.json();
  return marketAprList.marketaprs;
};

export const convertAprToApy = (apr: number, aprInterval: number): number => {
  return Math.pow(1 + apr / aprInterval, aprInterval) - 1;
};

export const delay = (seconds: number) =>
  new Promise((res) => setTimeout(res, seconds * 1000));

export const isFlow = (token: string): boolean => {
  return token.toLowerCase() == contracts.WNATIVE.toLowerCase();
};
