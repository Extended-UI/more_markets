import { JsonRpcProvider, Contract, InterfaceAbi } from "ethers";
import { readContract } from "@wagmi/core";
import { contracts } from "./const";
import { config } from "./wagmi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { ERC20Abi } from "@/app/abi/ERC20Abi";

const provider = new JsonRpcProvider("https://testnet.evm.nodes.onflow.org");
const marketsContract = new Contract(
  contracts.MORE_MARKETS,
  MarketsAbi as InterfaceAbi,
  provider
);

export const getMarketParams = async (market: string) => {
  const marketInfo = await marketsContract.idToMarketParams(market);
  return marketInfo;
};

export const getTokenAllowance = async (
  token: string,
  wallet: string,
  spender: string
): Promise<bigint> => {
  return await readContract(config, {
    abi: ERC20Abi,
    address: token as `0x${string}`,
    functionName: "allowance",
    args: [wallet as `0x${string}`, spender as `0x${string}`],
  });
};
