import { JsonRpcProvider, Contract, InterfaceAbi, ZeroAddress } from "ethers";
import {
  readContract,
  readContracts,
  writeContract,
  getBalance,
  signTypedData,
  waitForTransaction,
  type GetBalanceReturnType,
} from "@wagmi/core";
import { encodeFunctionData, encodeAbiParameters, erc20Abi } from "viem";
import { config } from "./wagmi";
import { MarketsAbi } from "@/app/abi/MarketsAbi";
import { ERC20Abi } from "@/app/abi/ERC20Abi";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { Market, VaultData } from "../types";
import {
  contracts,
  marketsInstance,
  curators,
  initBalance,
  bundlerInstance,
  permit2Instance,
  Uint48Max,
} from "./const";
import {
  getVaule,
  getVauleNum,
  getVauleBigint,
  getVauleBoolean,
  getVauleString,
  getVauleBigintList,
  getTimestamp,
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

export const setTokenAllowance = async (
  token: string,
  spender: string,
  amount: bigint
) => {
  const txHash = await writeContract(config, {
    address: token as `0x${string}`,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender as `0x${string}`, amount],
  });

  await waitForTransaction(config, { hash: txHash });
};

export const getTokenPermit = async (args: any[]): Promise<bigint> => {
  const permitInfo = await readContract(config, {
    ...permit2Instance,
    functionName: "allowance",
    args,
  });

  const permitAmount = BigInt((permitInfo as any[])[0]);
  const permitExpiration = BigInt((permitInfo as any[])[1]);

  return permitExpiration >= BigInt(Math.floor(Date.now() / 1000))
    ? permitAmount
    : BigInt(0);
};

export const setTokenPermit = async (
  token: string,
  amount: bigint,
  nonce: number,
  spender: string,
  deadline: bigint
): Promise<string> => {
  const result = await signTypedData(config, {
    types: {
      PermitDetails: [
        {
          name: "token",
          type: "address",
        },
        {
          name: "amount",
          type: "uint160",
        },
        {
          name: "expiration",
          type: "uint48",
        },
        {
          name: "nonce",
          type: "uint48",
        },
      ],
      PermitSingle: [
        { name: "details", type: "PermitDetails" },
        { name: "spender", type: "address" },
        { name: "sigDeadline", type: "uint256" },
      ],
    },
    primaryType: "PermitSingle",
    message: {
      details: {
        token: token as `0x${string}`,
        amount: amount,
        expiration: Uint48Max,
        nonce,
      },
      spender: spender as `0x${string}`,
      sigDeadline: deadline,
    },
    domain: {
      verifyingContract: contracts.PERMIT2 as `0x${string}`,
      chainId: 545,
      name: "Permit2",
    },
  });

  return result;
};

export const getTokenBallance = async (
  token: string,
  wallet: `0x${string}` | undefined
): Promise<GetBalanceReturnType> => {
  const userBalance = wallet
    ? await getBalance(config, {
        token: token as `0x${string}`,
        address: wallet,
      })
    : initBalance;

  return userBalance;
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

export const getPermitNonce = async (args: any[]): Promise<number> => {
  const nonceInfo = await readContract(config, {
    ...permit2Instance,
    functionName: "allowance",
    args,
  });

  return Number((nonceInfo as any[])[2]);
};

export const supplyToVaults = async (
  vault: string,
  asset: string,
  account: string,
  signhash: string,
  deadline: bigint,
  amount: bigint,
  nonce: number
): Promise<string> => {
  // encode approve2
  const approve2 = encodeFunctionData({
    abi: BundlerAbi,
    functionName: "approve2",
    args: [
      [[asset, amount, Uint48Max, nonce], contracts.MORE_BUNDLER, deadline],
      signhash,
      false,
    ],
  });

  // encode transferFrom2
  const transferFrom2 = encodeFunctionData({
    abi: BundlerAbi,
    functionName: "transferFrom2",
    args: [asset, amount],
  });

  // encode erc4626Deposit
  const erc4626Deposit = encodeFunctionData({
    abi: BundlerAbi,
    functionName: "erc4626Deposit",
    args: [vault, amount, 0, account],
  });

  // const encodedData = encodeAbiParameters(
  //   [{ name: "data", type: "bytes[]" }],
  //   [[approve2, transferFrom2, erc4626Deposit]]
  // );

  // console.log(encodedData);

  const txHash = await writeContract(config, {
    ...bundlerInstance,
    functionName: "multicall",
    args: [[approve2, transferFrom2, erc4626Deposit]],
  });

  return txHash;
};
