import { InvestmentData } from "./investmentData";

export interface IToken {
  name: string;
  symbol: string;
  decimals: number;
  oracle: string;
}

export interface IInvestmentProps {
  investments: InvestmentData[];
  updateInfo: (vaultId: string) => void;
}
