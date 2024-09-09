import { MarketConfig } from "./marketConfig";
import { MarketParams } from "./marketParams";
import { Markets } from "./markets";

export interface Market {
  config: MarketConfig;
  params: MarketParams;
  info: Markets;
}
