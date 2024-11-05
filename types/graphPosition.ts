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
