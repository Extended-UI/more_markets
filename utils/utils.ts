import { toast } from "react-toastify";
import { formatUnits, ZeroAddress } from "ethers";
import { GraphVault, IToken, MarketInfo, MarketParams } from "@/types";
import { tokens, curators, errorDecoder, contracts } from "./const";

export const notify = (errMsg: string) => toast(errMsg);

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
  decimals?: number,
  shares?: boolean
): number => {
  const extraDecimals = shares ? 6 : 0;
  return Number(
    formatUnits(
      amount,
      (decimals && decimals > 0 ? decimals : getTokenInfo(token).decimals) +
        extraDecimals
    )
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

export const notifyError = async (err: unknown) => {
  const decodedError = await errorDecoder.decode(err);
  console.log(decodedError);
  const errMsg = decodedError.reason
    ? decodedError.reason.split("\n")[0]
    : "Unknown Error";

  notify(errMsg);
};
