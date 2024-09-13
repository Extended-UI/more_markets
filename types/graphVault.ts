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
}
