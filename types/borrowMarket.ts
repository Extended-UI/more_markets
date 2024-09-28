import { GraphMarket } from "./graphMarket";
import { MarketInfo } from "./marketInfo";
import { MarketParams } from "./marketParams";

export interface BorrowMarket extends GraphMarket {
  borrow_apr: number;
  supply_usual_apr: number;
  supply_prem_apr: number;
  marketInfo: MarketInfo;
  marketParams: MarketParams;
}
