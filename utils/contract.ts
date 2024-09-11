import { JsonRpcProvider, Contract, InterfaceAbi, ZeroAddress } from "ethers";
import { readContract, readContracts, writeContract } from "@wagmi/core";
import { contracts, marketsInstance, curators } from "./const";
import { config } from "./wagmi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { ERC20Abi } from "@/app/abi/ERC20Abi";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import { Market, VaultData } from "../types";
import {
  getVaule,
  getVauleNum,
  getVauleBigint,
  getVauleBoolean,
  getVauleString,
  getVauleBigintList,
} from "./utils";

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

export const getMarketData = async (marketId: string): Promise<Market> => {
  // const [configs, params, infos] = await readContracts(config, {
  const [params, infos] = await readContracts(config, {
    contracts: [
      // {
      //   ...vaultContract,
      //   functionName: "config",
      //   args: [marketId],
      // },
      {
        ...marketsInstance,
        functionName: "idToMarketParams",
        args: [marketId as `0x${string}`],
      },
      {
        ...marketsInstance,
        functionName: "market",
        args: [marketId as `0x${string}`],
      },
    ],
  });

  return {
    // config: {
    //   cap: getVauleBigint(configs, 0),
    //   enabled: getVauleBoolean(configs, 1),
    //   removableAt: getVauleBigint(configs, 2),
    // },
    params: {
      isPremiumMarket: getVauleBoolean(params, 0),
      loanToken: getVauleString(params, 1),
      collateralToken: getVauleString(params, 2),
      oracle: getVauleString(params, 3),
      irm: getVauleString(params, 4),
      lltv: getVauleBigint(params, 5),
      creditAttestationService: getVauleString(params, 6),
      irxMaxLltv: getVauleBigint(params, 7),
      categoryLltv: getVauleBigintList(params, 8),
    },
    info: {
      totalSupplyAssets: getVauleBigint(infos, 0),
      totalSupplyShares: getVauleBigint(infos, 1),
      totalBorrowAssets: getVauleBigint(infos, 2),
      totalBorrowShares: getVauleBigint(infos, 3),
      lastUpdate: getVauleBigint(infos, 4),
      fee: getVauleBigint(infos, 5),
      isPremiumFeeEnabled: getVauleBoolean(infos, 6),
      premiumFee: getVauleBigint(infos, 7),
    },
  } as Market;
};

export const getVaultData = async (
  vaultAddress: `0x${string}`
): Promise<VaultData> => {
  const vaultContract = {
    address: vaultAddress,
    abi: VaultsAbi,
  };

  const [name, curator, asset, supplyQueueLength] = await readContracts(
    config,
    {
      contracts: [
        {
          ...vaultContract,
          functionName: "name",
        },
        {
          ...vaultContract,
          functionName: "curator",
        },
        {
          ...vaultContract,
          functionName: "asset",
        },
        {
          ...vaultContract,
          functionName: "supplyQueueLength",
        },
      ],
    }
  );

  const supplyQueueLen = getVauleNum(supplyQueueLength);
  const assetAddress = getVaule(asset);
  const curatorAddress = getVaule(curator);

  return {
    vaultName: getVaule(name),
    assetAddress,
    curator: curatorAddress == ZeroAddress ? "-" : curators[curatorAddress],
    supplyQueueLen,
  };
};

export const getVaultDetail = async (
  vaultAddress: `0x${string}`,
  functionName: string,
  args: any[]
) => {
  const vaultContract = {
    address: vaultAddress,
    abi: VaultsAbi,
  };

  return await readContract(config, {
    ...vaultContract,
    functionName: functionName,
    args,
  });
};

export const sendToMarkets = async (
  functionName: string,
  args: any[]
): Promise<string> => {
  const txHash = await writeContract(config, {
    address: contracts.MORE_MARKETS as `0x${string}`,
    abi: MarketsAbi,
    functionName: functionName,
    args: args,
  });

  return txHash;
};
