interface MarketConfig {
  cap: bigint;
  enabled: boolean;
  removableAt: bigint;
}

export interface MarketParams {
  isPremiumMarket: boolean;
  loanToken: `0x${string}`;
  collateralToken: `0x${string}`;
  oracle: `0x${string}`;
  irm: `0x${string}`;
  lltv: bigint;
  creditAttestationService: `0x${string}`;
  irxMaxLltv: bigint;
  categoryLltv: bigint[];
}

export interface MarketInfo {
  totalSupplyAssets: bigint;
  totalSupplyShares: bigint;
  totalBorrowAssets: bigint;
  totalBorrowShares: bigint;
  lastUpdate: bigint;
  fee: bigint;
  premiumFee: bigint;
}

export interface Market {
  // config: MarketConfig;
  params: MarketParams;
  info: MarketInfo;
}
