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

interface IAmount {
  amount: string;
}

export interface GraphPosition {
  id: string;
  asset: {
    id: string;
  };
  balance: string;
  borrows: IAmount[];
  repays: IAmount[];
  market: {
    id: string;
  };
}

interface IQueue {
  market: {
    id: string;
  };
}

export interface GraphVault {
  id: string;
  supplyQueue: IQueue[];
  name: string;
  curator: {
    id: string;
  } | null;
  asset: {
    id: string;
  };
  lastTotalAssets: string;
  totalShares: string;
  guardian: {
    id: string;
  } | null;
  timelock: bigint;
}

interface ILBItem {
  amount: string;
}

interface ILBPosition {
  id: string;
  market: {
    totalSupply: string;
    totalSupplyShares: string;
    inputToken: {
      id: string;
    };
    borrowedToken: {
      id: string;
    };
  };
  balance: string;
  shares: string;
  repays: ILBItem[];
  borrows: ILBItem[];
}

export interface ILBUser {
  id: string;
  positions: ILBPosition[];
}

export interface ILBPositionItem {
  market: string;
  supplyToken: string;
  borrowToken: string;
  supply: bigint;
  borrow: bigint;
  repay: bigint;
  collateral: bigint;
}
