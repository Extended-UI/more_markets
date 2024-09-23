import { BorrowMarket } from "./borrowMarket";

export interface BorrowPosition extends BorrowMarket {
  loan: bigint;
  collateral: bigint;
  lastMultiplier: bigint;
}
