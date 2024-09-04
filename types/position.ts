export interface Position {
  supplyShares: bigint;
  borrowShares: bigint;
  collateral: bigint;
  lastMultiplier: bigint;
  debtTokenMissed: bigint;
  debtTokenGained: bigint;
}
