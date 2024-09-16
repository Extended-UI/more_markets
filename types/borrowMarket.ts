import { GraphMarket } from "./graphMarket";
import { MarketInfo } from "./marketInfo";
import { MarketParams } from "./marketParams";

export interface BorrowMarket extends GraphMarket {
  marketInfo: MarketInfo;
  marketParams: MarketParams;
}
