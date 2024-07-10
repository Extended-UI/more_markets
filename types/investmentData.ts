export interface InvestmentData {
    tokenSymbol: string;
    netAPY: number;
    totalDeposits: number;
    totalValueUSD: number;
    curator: number;
    collateral: string[];
    unsecured: number;
    unsecuredAPY: number;
  }