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
