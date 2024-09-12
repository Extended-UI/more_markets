import { GraphMarket } from "./graphMarket";
import { MarketParams } from "./marketParams";

export interface BorrowMarket extends GraphMarket {
  marketParams: MarketParams;
}
