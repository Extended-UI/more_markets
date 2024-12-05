import { GraphMarket } from "./graph";
import { MarketInfo, MarketParams } from "./market";

export interface BorrowMarket extends GraphMarket {
  borrow_apr: number;
  supply_usual_apr: number;
  supply_prem_apr: number;
  totalCollateral: number;
  marketInfo: MarketInfo;
  marketParams: MarketParams;
}

export interface BorrowPosition extends BorrowMarket {
  loan: bigint;
  borrowShares: bigint;
  collateral: bigint;
  lastMultiplier: bigint;
}
