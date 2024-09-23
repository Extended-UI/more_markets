export interface GraphMarket {
  id: string;
  inputToken: {
    id: string;
  };
  borrowedToken: {
    id: string;
  };
  lltv: bigint;
  totalSupply: string;
  totalBorrow: string;
}
