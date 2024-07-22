export interface InvestmentData {
    tokenSymbol: string;
    netAPY: number;
    totalDeposits: number;
    totalValueUSD: number;
    curator: string;
    collateral: string[];
    unsecured: number;
    unsecuredAPY: number;
    credoraRating: string;
  }