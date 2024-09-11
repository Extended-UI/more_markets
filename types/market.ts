import { MarketConfig } from "./marketConfig";
import { MarketParams } from "./marketParams";
import { MarketInfo } from "./marketInfo";

export interface Market {
  // config: MarketConfig;
  params: MarketParams;
  info: MarketInfo;
}
