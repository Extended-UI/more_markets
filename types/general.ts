import { BorrowMarket } from "./borrowMarket";
import { BorrowPosition } from "./borrowPosition";
import { InvestmentData } from "./investmentData";
import { MoreAction } from "@/utils/const";

export interface IToken {
  name: string;
  symbol: string;
  decimals: number;
  oracle: string;
}

interface IInvestmentBase {
  item: InvestmentData;
}

export interface IInvestmentProp extends IInvestmentBase {
  updateInfo: (vaultId: string) => void;
}

export interface IInvestment extends IInvestmentBase {
  closeModal: () => void;
}

export interface IInvestmentPush extends IInvestment {
  amount: string;
  setTxHash: (hash: string) => void;
}

export interface IInvestmentResult extends IInvestmentBase {
  amount: string;
  txhash: string;
  processDone: () => void;
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

export interface IBorrowPositionResult {
  txhash: string;
  amount: string;
  item: BorrowPosition;
  processDone: () => void;
}

export interface IBorrowPositionProp extends IBorrowPosition {
  updateInfo: (marketId: string) => void;
}

export interface IVaultProgram {
  total_reward: string;
  reward_decimals: string;
  price_info: string;
}

export interface IVaultApr {
  vaultid: string;
  apr: number;
  programs: IVaultProgram[];
  total_shares: string;
}

export interface IMarketApr {
  marketid: string;
  supply_usual_apr: number;
  supply_prem_apr: number;
  borrow_apr: number;
}

export interface IMoreError {
  action: MoreAction;
  error: string;
  message: string;
}

export interface IMarketUserRow {
  user_address: string;
  collateral_amount: string;
  borrow_amount: string;
}

export interface IMarketUser {
  user_address: string;
  collateral_amount: bigint;
  borrow_amount: bigint;
  collateral_percent: number;
  borrow_percent: number;
  health_factor: number;
}

export interface IMarketUserProps {
  marketUsers: IMarketUser[];
  item: BorrowMarket;
}
