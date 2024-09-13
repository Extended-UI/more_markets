interface IAmount {
  amount: string;
}

interface IId {
  id: string;
}

export interface GraphPosition {
  id: string;
  asset: IId;
  balance: string;
  borrows: IAmount[];
  repays: IAmount[];
  market: IId;
}
