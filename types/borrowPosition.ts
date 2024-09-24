import { BorrowMarket } from "./borrowMarket";

export interface BorrowPosition extends BorrowMarket {
  loan: bigint;
  borrowShares: bigint;
  collateral: bigint;
  lastMultiplier: bigint;
}
