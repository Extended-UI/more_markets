import { InvestmentData } from "./investmentData";

export interface IToken {
  name: string;
  symbol: string;
  decimals: number;
}

export interface IInvestmentProps {
  investments: InvestmentData[];
  updateInfo: (vaultId: string) => void;
}
