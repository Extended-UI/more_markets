export interface Position {
  id: string;
  supplyShares: bigint;
  borrowShares: bigint;
  collateral: bigint;
  lastMultiplier: bigint;
  debtTokenMissed: bigint;
  debtTokenGained: bigint;
}
