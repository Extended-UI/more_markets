import _ from "lodash";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { formatUnits, parseUnits, ZeroAddress, toBigInt } from "ethers";
import { ErrorDecoder } from "ethers-decode-error";
import { MoreErrors } from "@/utils/errors";
import {
  IToken,
  MarketInfo,
  MarketParams,
  IVaultApr,
  IMarketApr,
  IMarketUserRow,
  IVaultProgram,
  IVaultApy,
  IVaultAprItem,
  IRewardClaim,
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
  apyMultiplier,
  apyDivider,
} from "./const";

const errorDecoder = ErrorDecoder.create();

export const notify = (errMsg: string) => errMsg.length > 0 && toast(errMsg);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    const tokenInfo = tokens[token.toLowerCase()];
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

export const validInputAmount = (inputVal: string): boolean =>
  inputVal.length > 0 && Number(inputVal) > 0;

export const validAmountWithBool = (
  inputVal: string,
  boolVal: boolean
): boolean => inputVal.length > 0 && (boolVal || Number(inputVal) > 0);

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

export const formatCurator = (curator: string): string => {
  return curator.length > 0 && curator != ZeroAddress
    ? curators[curator.toLowerCase()]
    : "-";
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

export const wMulDown = (x: bigint, y: bigint): bigint => {
  const returnVal = mulDivDown(x, y, WAD);
  return returnVal > moreTolerance ? returnVal - moreTolerance : BigInt(0);
};

export const getExtraMax = (x: bigint, y: bigint, decimals: number): bigint => {
  console.log("decimals:", decimals);
  y = y + parseUnits("1", decimals - 4);
  return x >= y ? x - y : BigInt(0);
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

export const fetchMarketUsers = async (
  marketid: string
): Promise<IMarketUserRow[]> => {
  const fetchResult = await fetch("/api/marketuser?&marketid=" + marketid, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const marketAprList = await fetchResult.json();
  return marketAprList.users;
};

export const convertAprToApy = (apr: number, aprInterval: number): number => {
  return Math.pow(1 + apr / aprInterval, aprInterval) - 1;
};

export const delay = (seconds: number) =>
  new Promise((res) => setTimeout(res, seconds * 1000));

export const isFlow = (token: string): boolean => {
  return token.toLowerCase() == contracts.WNATIVE.toLowerCase();
};

export const formatAddress = (userAddr: string): string => {
  return (
    userAddr.substring(0, 6) + "..." + userAddr.substring(userAddr.length - 4)
  );
};

export const getVaultApyInfo = (
  aprItem: IVaultApr | undefined,
  aprDates: number
): IVaultApy => {
  if (_.isUndefined(aprItem))
    return {
      base_apy: 0,
      boost_apy: 0,
      box_apy: 0,
      total_apy: 0,
      boost_apys: [],
    };

  const baseApy = convertAprToApy(aprItem.apr, aprDates) * 100;
  const boostApy = getVaultProgramApy(
    aprItem.programs,
    toBigInt(aprItem.total_shares)
  );
  const totalBoostApy = boostApy.reduce(
    (memo, boostApyItem) => (memo += boostApyItem.apy),
    0
  );
  const boxApy = getBoxProgramApy(
    toBigInt(aprItem.boxes),
    toBigInt(aprItem.total_shares)
  );

  return {
    base_apy: baseApy,
    boost_apy: totalBoostApy,
    boost_apys: boostApy,
    box_apy: boxApy,
    total_apy: baseApy + totalBoostApy + boxApy,
  };
};

const getRewardPrice = (priceInfo: string): bigint => {
  return BigInt(1);
};

const getBoxProgramApy = (boxes: bigint, deposited: bigint): number => {
  if (deposited == BigInt(0)) return 0;

  // 1box = 0.005FLOW
  return (
    Number((boxes * BigInt(5) * apyMultiplier) / deposited / BigInt(1e3)) /
    apyDivider
  );
};

const getVaultProgramApy = (
  programs: IVaultProgram[],
  deposited: bigint
): IVaultAprItem[] => {
  if (deposited == BigInt(0)) return [{ apy: 0, priceInfo: "" }];

  return _.chain(programs)
    .groupBy((item) => item.price_info)
    .map((groupPrograms, key) => {
      const rewardSum = groupPrograms.reduce(
        (memo, program) =>
          (memo +=
            parseUnits(program.total_reward, program.reward_decimals) *
            getRewardPrice(program.price_info)),
        BigInt(0)
      );

      return {
        apy: Number((rewardSum * apyMultiplier) / deposited) / apyDivider,
        priceInfo: key,
      };
    })
    .value();
};
