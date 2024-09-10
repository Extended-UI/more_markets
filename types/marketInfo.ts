export interface MarketInfo {
  totalSupplyAssets: bigint;
  totalSupplyShares: bigint;
  totalBorrowAssets: bigint;
  totalBorrowShares: bigint;
  lastUpdate: bigint;
  fee: bigint;
  isPremiumFeeEnabled: boolean;
  premiumFee: bigint;
}
