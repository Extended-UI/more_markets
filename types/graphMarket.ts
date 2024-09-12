export interface GraphMarket {
  id: string;
  inputToken: {
    id: string;
  };
  borrowedToken: {
    id: string;
  };
  lltv: string;
  totalSupply: string;
  totalBorrow: string;
}
