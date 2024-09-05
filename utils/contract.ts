import { JsonRpcProvider, Contract, InterfaceAbi } from "ethers";
import { contracts } from "./const";
import { InvestmentData } from "@/types";
import { MorphoAbi } from "@/app/abi/MorphoAbi";

const provider = new JsonRpcProvider("https://testnet.evm.nodes.onflow.org");
const marketsContract = new Contract(
  contracts.MORE_MARKETS,
  MorphoAbi as InterfaceAbi,
  provider
);

export const getMarketParams = async (market: string) => {
  const marketInfo = await marketsContract.idToMarketParams(market);
  return marketInfo;
};
