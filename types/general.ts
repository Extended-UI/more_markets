import { BorrowMarket } from "./borrowMarket";
import { BorrowPosition } from "./borrowPosition";
import { InvestmentData } from "./investmentData";

export interface IToken {
  name: string;
  symbol: string;
  decimals: number;
  oracle: string;
}

export interface IInvestmentProp {
  item: InvestmentData;
  updateInfo: (vaultId: string) => void;
}

export interface IInvestmentProps {
  investments: InvestmentData[];
  updateInfo: (vaultId: string) => void;
}

export interface IBorrowMarketProp {
  item: BorrowMarket;
  updateInfo: (marketId: string) => void;
}

export interface IBorrowMarketProps {
  borrowMarkets: BorrowMarket[];
  updateInfo: (marketId: string) => void;
}

export interface IBorrowPosition {
  item: BorrowPosition;
  closeModal: () => void;
}

export interface IBorrowPositionProp extends IBorrowPosition {
  updateInfo: (marketId: string) => void;
}

export interface IVaultApr {
  vaultid: string;
  apr: number;
}

export interface IMarketApr {
  marketid: string;
  supply_usual_apr: number;
  supply_prem_apr: number;
  borrow_apr: number;
}
