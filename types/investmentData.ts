export interface InvestmentData {
  vaultId: string;
  vaultName: string;
  assetAddress: string;
  netAPY: number;
  userDeposits: number;
  userShares: bigint;
  totalDeposits: number;
  curator: string;
  collateral: string[];
  guardian: string;
  timelock: bigint;
  // unsecured: number;
}
