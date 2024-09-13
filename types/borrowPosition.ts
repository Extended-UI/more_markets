import { BorrowMarket } from "./borrowMarket";

export interface BorrowPosition extends BorrowMarket {
  collateral: bigint;
  loan: bigint;
}
