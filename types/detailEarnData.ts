export interface DetailEarnData {
    allocation?: number;
    allocationColor?: string;
    supplyAmount: number;
    supplyCurrency: string;
    supplyValue: number;
    collateral: string[];
    liquidationLTV: number;
    liquidationLTV2: number;
    credoraRating: string;
    unsecuredBorrowAmount: number;
    unsecuredBorrowValue: number;
    unsecuredAPY: number;
    transaction?:string;
    time?:string;
  }
  