export interface VaultBreakdown {
  id: string;
  allowcation: number;
  supply: number;
  borrow: number;
  supplyToken: string;
  collateral: string;
  lltv: number;
  lltv2: number | null;
  credora: string;
}
