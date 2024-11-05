import { IVaultProgram } from "./general";

export interface IVaultAprItem {
  apy: number;
  priceInfo: string;
}

export interface IVaultApy {
  base_apy: number;
  boost_apy: number;
  boost_apys: IVaultAprItem[];
  box_apy: number;
  total_apy: number;
}

export interface InvestmentData {
  vaultId: string;
  vaultName: string;
  assetAddress: string;
  netAPY: IVaultApy;
  userDeposits: number;
  userShares: bigint;
  totalDeposits: number;
  curator: string;
  collateral: string[];
  guardian: string;
  timelock: bigint;
  programs: IVaultProgram[];
  // unsecured: number;
}
