import { encodeFunctionData } from "viem";
import { ZeroAddress, MaxUint256, parseUnits, formatUnits } from "ethers";
import {
  readContract,
  readContracts,
  writeContract,
  getBalance,
  signTypedData,
  watchAsset,
  type GetBalanceReturnType,
  waitForTransactionReceipt,
  simulateContract,
} from "@wagmi/core";
import { config } from "./wagmi";
import { ERC20Abi } from "@/app/abi/ERC20Abi";
import { VaultsAbi } from "@/app/abi/VaultsAbi";
import { BundlerAbi } from "@/app/abi/BundlerAbi";
import { OracleAbi } from "@/app/abi/OracleAbi";
import {
  Market,
  MarketInfo,
  MarketParams,
  Position,
  GraphVault,
  GraphMarket,
  BorrowPosition,
  InvestmentData,
} from "../types";
import {
  contracts,
  initBalance,
  marketsInstance,
  bundlerInstance,
  permit2Instance,
  apyfeedInstance,
  Uint48Max,
  gasLimit,
  vaultIds,
  marketIds,
} from "./const";
import {
  getVaule,
  getVauleNum,
  getVauleBigint,
  getVauleBoolean,
  getVauleString,
  getVauleBigintList,
  getTokenInfo,
  toAssetsUp,
  isFlow,
} from "./utils";

const chainId = config.chains[0].id;

const executeTransaction = async (
  multicallArgs: string[],
  value: bigint = BigInt(0)
): Promise<string> => {
  const simulateResult = await simulateContract(config, {
    ...bundlerInstance,
    functionName: "multicall",
    args: [multicallArgs],
    value: value,
    gas: parseUnits(gasLimit, 6),
  });
  return await writeContract(config, simulateResult.request);
};

const addWrapNative = (multicallArgs: string[], amount: bigint): string[] => {
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "wrapNative",
      args: [amount],
    })
  );

  return multicallArgs;
};

const addUnwrapNative = (
  multicallArgs: string[],
  account: string
): string[] => {
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "unwrapNative",
      args: [MaxUint256],
    })
  );

  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "nativeTransfer",
      args: [account, MaxUint256],
    })
  );

  return multicallArgs;
};

export const getTokenPairPrice = async (oracle: string): Promise<bigint> => {
  try {
    if (oracle == ZeroAddress) return BigInt(0);

    const pairPrice = await readContract(config, {
      address: oracle as `0x${string}`,
      abi: OracleAbi,
      functionName: "price",
    });

    return pairPrice as bigint;
  } catch {
    return BigInt(0);
  }
};

export const getTokenPrice = async (token: string): Promise<number> => {
  try {
    const oracleContract = {
      address: getTokenInfo(contracts.WNATIVE).oracle as `0x${string}`,
      abi: OracleAbi,
    };

    let requestList = [
      {
        ...oracleContract,
        functionName: "decimals",
      },
      {
        ...oracleContract,
        functionName: "latestAnswer",
      },
    ];

    if (!isFlow(token)) {
      requestList.push({
        address: getTokenInfo(token).oracle as `0x${string}`,
        abi: OracleAbi,
        functionName: "price",
      });
    }

    const priceResult = await readContracts(config, {
      contracts: requestList,
    });

    const decimalVal = Number(priceResult[0].result);
    const answerVal = priceResult[1].result as bigint;

    const flowPrice = parseFloat(formatUnits(answerVal, decimalVal));
    if (isFlow(token)) return flowPrice;
    else {
      return (
        flowPrice * parseFloat(formatUnits(priceResult[2].result as bigint, 36))
      );
    }
  } catch {
    return 0;
  }
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

export const getBorrowedAmount = async (
  marketId: string,
  multiplier: bigint,
  shares: bigint
): Promise<bigint> => {
  if (shares > BigInt(0)) {
    const [totalBAMultiplier, totalBSMultiplier] = await readContracts(config, {
      contracts: [
        {
          ...marketsInstance,
          functionName: "totalBorrowAssetsForMultiplier",
          args: [marketId, multiplier],
        },
        {
          ...marketsInstance,
          functionName: "totalBorrowSharesForMultiplier",
          args: [marketId, multiplier],
        },
      ],
    });

    return toAssetsUp(
      shares,
      totalBAMultiplier.result as bigint,
      totalBSMultiplier.result as bigint
    );
  } else {
    return BigInt(0);
  }
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

export const getTokenBallance = async (
  token: string,
  wallet: `0x${string}` | undefined
): Promise<GetBalanceReturnType> => {
  const userBalance = wallet
    ? isFlow(token)
      ? await getBalance(config, {
          address: wallet,
        })
      : await getBalance(config, {
          token: token as `0x${string}`,
          address: wallet,
        })
    : initBalance;

  return userBalance;
};

export const getPositions = async (
  account: string,
  marketIds: string[]
): Promise<Position[]> => {
  const contracts = marketIds.map((marketId) => {
    return {
      ...marketsInstance,
      functionName: "position",
      args: [marketId, account],
    };
  });

  const fetchedPositions = await readContracts(config, {
    contracts,
  });
  const positionDetails = fetchedPositions
    .map((fetchedPosition, ind) => {
      return {
        id: marketIds[ind],
        supplyShares: getVauleBigint(fetchedPosition, 0),
        borrowShares: getVauleBigint(fetchedPosition, 1),
        collateral: getVauleBigint(fetchedPosition, 2),
        lastMultiplier: getVauleBigint(fetchedPosition, 3),
        // debtTokenMissed: getVauleBigint(fetchedPosition, 4),
        // debtTokenGained: getVauleBigint(fetchedPosition, 5),
      } as Position;
    })
    .filter(
      (positionItem) =>
        positionItem.collateral > BigInt(0) ||
        positionItem.borrowShares > BigInt(0)
    );

  return positionDetails;
};

export const getPosition = async (
  account: string,
  marketId: string
): Promise<Position | null> => {
  const fetchedPosition = await readContract(config, {
    ...marketsInstance,
    functionName: "position",
    args: [marketId, account],
  });

  const positionItem = {
    id: marketId,
    supplyShares: BigInt((fetchedPosition as any[])[0]),
    borrowShares: BigInt((fetchedPosition as any[])[1]),
    collateral: BigInt((fetchedPosition as any[])[2]),
    lastMultiplier: BigInt((fetchedPosition as any[])[3]),
    // debtTokenMissed: BigInt((fetchedPosition as any[])[4]),
    // debtTokenGained: BigInt((fetchedPosition as any[])[5]),
  } as Position;

  return positionItem.collateral > BigInt(0) ||
    positionItem.borrowShares > BigInt(0)
    ? positionItem
    : null;
};

export const getMarketParams = async (
  marketId: string
): Promise<MarketParams> => {
  const params = await readContract(config, {
    ...marketsInstance,
    functionName: "idToMarketParams",
    args: [marketId as `0x${string}`],
  });

  return {
    isPremiumMarket: (params as any[])[0],
    loanToken: (params as any[])[1],
    collateralToken: (params as any[])[2],
    oracle: (params as any[])[3],
    irm: (params as any[])[4],
    lltv: (params as any[])[5],
    creditAttestationService: (params as any[])[6],
    irxMaxLltv: (params as any[])[7],
    categoryLltv: (params as any[])[8],
  } as MarketParams;
};

export const getMarketInfo = async (marketId: string): Promise<MarketInfo> => {
  const infos = await readContract(config, {
    ...marketsInstance,
    functionName: "market",
    args: [marketId as `0x${string}`],
  });

  return {
    totalSupplyAssets: (infos as any[])[0],
    totalSupplyShares: (infos as any[])[1],
    totalBorrowAssets: (infos as any[])[2],
    totalBorrowShares: (infos as any[])[3],
    lastUpdate: (infos as any[])[4],
    fee: (infos as any[])[5],
    premiumFee: (infos as any[])[6],
  } as MarketInfo;
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
      premiumFee: getVauleBigint(infos, 6),
    },
  } as Market;
};

export const getVaultDetail = async (
  vaultAddress: string,
  functionName: string,
  args: any[]
) => {
  const vaultContract = {
    address: vaultAddress as `0x${string}`,
    abi: VaultsAbi,
  };

  return await readContract(config, {
    ...vaultContract,
    functionName: functionName,
    args,
  });
};

export const getPermitNonce = async (args: any[]): Promise<number> => {
  const nonceInfo = await readContract(config, {
    ...permit2Instance,
    functionName: "allowance",
    args,
  });

  return Number((nonceInfo as any[])[2]);
};

export const getAuthorizeNonce = async (account: string): Promise<bigint> => {
  const nonceInfo = await readContract(config, {
    ...marketsInstance,
    functionName: "nonce",
    args: [account],
  });

  return nonceInfo as bigint;
};

export const checkAuthorized = async (account: string): Promise<boolean> => {
  const authorizeInfo = await readContract(config, {
    ...marketsInstance,
    functionName: "isAuthorized",
    args: [account, contracts.MORE_BUNDLER],
  });

  return authorizeInfo as boolean;
};

export const getVaultNonce = async (
  vaultAddress: `0x${string}`,
  account: string
): Promise<bigint> => {
  const vaultContract = {
    address: vaultAddress,
    abi: VaultsAbi,
  };

  const nonceInfo = await readContract(config, {
    ...vaultContract,
    functionName: "nonces",
    args: [account],
  });

  return nonceInfo as bigint;
};

export const getVaultSupplyRate = async (
  vaultAddress: string
): Promise<bigint> => {
  const aprInfo = await readContract(config, {
    ...apyfeedInstance,
    functionName: "getVaultSupplyRate",
    args: [vaultAddress],
  });

  return aprInfo as bigint;
};

export const getMarketSupplyRate = async (
  marketParams: MarketParams
): Promise<bigint> => {
  const aprInfo = await readContract(config, {
    ...apyfeedInstance,
    functionName: "getMarketSupplyRate",
    args: [
      contracts.MORE_MARKETS,
      [
        marketParams.isPremiumMarket,
        marketParams.loanToken,
        marketParams.collateralToken,
        marketParams.oracle,
        marketParams.irm,
        marketParams.lltv,
        marketParams.creditAttestationService,
        marketParams.irxMaxLltv,
        marketParams.categoryLltv,
      ],
    ],
  });

  return aprInfo as bigint;
};

export const getMarketBorrowRate = async (
  marketParams: MarketParams
): Promise<bigint> => {
  const aprInfo = await readContract(config, {
    ...apyfeedInstance,
    functionName: "getBorrowRate",
    args: [
      contracts.MORE_MARKETS,
      [
        marketParams.isPremiumMarket,
        marketParams.loanToken,
        marketParams.collateralToken,
        marketParams.oracle,
        marketParams.irm,
        marketParams.lltv,
        marketParams.creditAttestationService,
        marketParams.irxMaxLltv,
        marketParams.categoryLltv,
      ],
    ],
  });

  return aprInfo as bigint;
};

export const waitForTransaction = async (txHash: string) => {
  await waitForTransactionReceipt(config, { hash: txHash as `0x${string}` });
};

export const addNewToken = async (
  token: string,
  symbol: string,
  decimals: number
) => {
  await watchAsset(config, {
    type: "ERC20",
    options: {
      address: token,
      symbol,
      decimals,
    },
  });
};

export const setTokenAllowance = async (
  token: string,
  spender: string,
  amount: bigint
) => {
  const txHash = await writeContract(config, {
    address: token as `0x${string}`,
    abi: ERC20Abi,
    functionName: "approve",
    args: [spender as `0x${string}`, amount],
  });

  await waitForTransaction(txHash);
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
      chainId: chainId,
      name: "Permit2",
    },
  });

  return result;
};

export const setMarketsAuthorize = async (
  account: `0x${string}`,
  nonce: bigint,
  deadline: bigint
): Promise<string> => {
  const result = await signTypedData(config, {
    types: {
      Authorization: [
        { name: "authorizer", type: "address" },
        { name: "authorized", type: "address" },
        { name: "isAuthorized", type: "bool" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: "Authorization",
    message: {
      authorizer: account,
      authorized: contracts.MORE_BUNDLER as `0x${string}`,
      isAuthorized: true,
      nonce,
      deadline,
    },
    domain: {
      verifyingContract: contracts.MORE_MARKETS as `0x${string}`,
      chainId: chainId,
    },
  });

  return result;
};

export const setVaultPermit = async (
  vaultName: string,
  account: `0x${string}`,
  vaultAddress: string,
  amount: bigint,
  nonce: bigint,
  deadline: bigint
): Promise<string> => {
  const result = await signTypedData(config, {
    types: {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    },
    primaryType: "Permit",
    message: {
      owner: account,
      spender: contracts.MORE_BUNDLER as `0x${string}`,
      value: amount,
      nonce,
      deadline,
    },
    domain: {
      verifyingContract: vaultAddress as `0x${string}`,
      chainId: chainId,
      name: vaultName,
      version: "1",
    },
  });

  return result;
};

export const depositToVaults = async (
  vault: string,
  asset: string,
  account: string,
  signhash: string,
  deadline: bigint,
  amount: bigint,
  nonce: number,
  useFlow: boolean
): Promise<string> => {
  let multicallArgs: string[] = [];
  if (useFlow) {
    multicallArgs = addWrapNative(multicallArgs, amount);
  } else {
    // encode approve2
    if (signhash.length > 0)
      multicallArgs.push(
        encodeFunctionData({
          abi: BundlerAbi,
          functionName: "approve2",
          args: [
            [
              [asset, amount, Uint48Max, nonce],
              contracts.MORE_BUNDLER,
              deadline,
            ],
            signhash,
            false,
          ],
        })
      );

    // encode transferFrom2
    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "transferFrom2",
        args: [asset, amount],
      })
    );
  }

  // encode erc4626Deposit
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "erc4626Deposit",
      args: [vault, amount, 0, account],
    })
  );
  return await executeTransaction(multicallArgs, useFlow ? amount : BigInt(0));
};

export const withdrawFromVaults = async (
  account: string,
  amount: bigint,
  deadline: bigint,
  signhash: string,
  authHash: string,
  authNonce: bigint,
  useShare: boolean,
  item: InvestmentData
): Promise<string> => {
  let multicallArgs: string[] = [];

  const { vaultId: vaultAddress, userShares, assetAddress } = item;

  // authorize
  if (authHash.length > 0) {
    const r1 = authHash.slice(0, 66);
    const s1 = "0x" + authHash.slice(66, 130);
    const v1 = "0x" + authHash.slice(130, 132);

    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "morphoSetAuthorizationWithSig",
        args: [
          [account, contracts.MORE_BUNDLER, true, authNonce, deadline],
          [v1, r1, s1],
          false,
        ],
      })
    );
  }

  if (signhash.length > 0) {
    const r = signhash.slice(0, 66);
    const s = "0x" + signhash.slice(66, 130);
    const v = "0x" + signhash.slice(130, 132);

    // encode permit
    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "permit",
        args: [vaultAddress, MaxUint256, deadline, v, r, s, false],
      })
    );
  }

  const flowVault = isFlow(assetAddress);
  const receiverAddr = flowVault ? contracts.MORE_BUNDLER : account;

  // encode erc4626Withdraw
  multicallArgs.push(
    useShare
      ? encodeFunctionData({
          abi: BundlerAbi,
          functionName: "erc4626Redeem",
          args: [vaultAddress, userShares, 0, receiverAddr, account],
        })
      : encodeFunctionData({
          abi: BundlerAbi,
          functionName: "erc4626Withdraw",
          args: [vaultAddress, amount, MaxUint256, receiverAddr, account],
        })
  );

  // unwrap and transfer if flow
  if (flowVault) multicallArgs = addUnwrapNative(multicallArgs, account);
  return await executeTransaction(multicallArgs);
};

export const supplycollateralAndBorrow = async (
  authHash: string,
  authNonce: bigint,
  account: string,
  signhash: string,
  deadline: bigint,
  supplyAmount: bigint,
  borrowAmount: bigint,
  nonce: number,
  onlyBorrow: boolean,
  item: BorrowPosition
): Promise<string> => {
  let multicallArgs: string[] = [];
  const { marketParams, inputToken, borrowedToken } = item;
  const { id: supplyAsset } = inputToken;
  const { id: borrowAsset } = borrowedToken;

  // authorize
  if (authHash.length > 0) {
    const r1 = authHash.slice(0, 66);
    const s1 = "0x" + authHash.slice(66, 130);
    const v1 = "0x" + authHash.slice(130, 132);

    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "morphoSetAuthorizationWithSig",
        args: [
          [account, contracts.MORE_BUNDLER, true, authNonce, deadline],
          [v1, r1, s1],
          false,
        ],
      })
    );
  }

  const supplyFlow = isFlow(supplyAsset);
  if (!onlyBorrow) {
    if (supplyFlow) {
      multicallArgs = addWrapNative(multicallArgs, supplyAmount);
    } else {
      // encode approve2
      if (signhash.length > 0)
        multicallArgs.push(
          encodeFunctionData({
            abi: BundlerAbi,
            functionName: "approve2",
            args: [
              [
                [supplyAsset, supplyAmount, Uint48Max, nonce],
                contracts.MORE_BUNDLER,
                deadline,
              ],
              signhash,
              false,
            ],
          })
        );

      // encode transferFrom2
      multicallArgs.push(
        encodeFunctionData({
          abi: BundlerAbi,
          functionName: "transferFrom2",
          args: [supplyAsset, supplyAmount],
        })
      );
    }

    // encode morphoSupplyCollateral
    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "morphoSupplyCollateral",
        args: [
          [
            marketParams.isPremiumMarket,
            marketParams.loanToken,
            marketParams.collateralToken,
            marketParams.oracle,
            marketParams.irm,
            marketParams.lltv,
            marketParams.creditAttestationService,
            marketParams.irxMaxLltv,
            marketParams.categoryLltv,
          ],
          supplyAmount,
          account,
          "",
        ],
      })
    );
  }

  const borroFlow = isFlow(borrowAsset);
  // encode morphoBorrow
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "morphoBorrow",
      args: [
        [
          marketParams.isPremiumMarket,
          marketParams.loanToken,
          marketParams.collateralToken,
          marketParams.oracle,
          marketParams.irm,
          marketParams.lltv,
          marketParams.creditAttestationService,
          marketParams.irxMaxLltv,
          marketParams.categoryLltv,
        ],
        borrowAmount,
        0,
        MaxUint256,
        borroFlow ? contracts.MORE_BUNDLER : account,
      ],
    })
  );

  if (borroFlow) multicallArgs = addUnwrapNative(multicallArgs, account);
  return await executeTransaction(
    multicallArgs,
    supplyFlow ? supplyAmount : BigInt(0)
  );
};

export const repayLoanViaMarkets = async (
  account: string,
  repayAmount: bigint,
  useShare: boolean,
  item: BorrowPosition
): Promise<string> => {
  const { marketParams, borrowedToken } = item;
  const { id: borrowToken } = borrowedToken;
  const borroFlow = isFlow(borrowToken);

  if (borroFlow) {
    let multicallArgs: string[] = [];

    const flowAmount =
      (await getBorrowedAmount(
        item.id,
        item.lastMultiplier,
        item.borrowShares
      )) + parseUnits("0.0001");

    // wrap
    multicallArgs = addWrapNative(multicallArgs, flowAmount);

    // then repay
    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "morphoRepay",
        args: [
          [
            marketParams.isPremiumMarket,
            marketParams.loanToken,
            marketParams.collateralToken,
            marketParams.oracle,
            marketParams.irm,
            marketParams.lltv,
            marketParams.creditAttestationService,
            marketParams.irxMaxLltv,
            marketParams.categoryLltv,
          ],
          useShare ? 0 : repayAmount,
          useShare ? item.borrowShares : 0,
          useShare ? MaxUint256 : 0,
          account,
          "",
        ],
      })
    );

    // then unwarp and transfer remaing flow
    multicallArgs = addUnwrapNative(multicallArgs, account);
    return await executeTransaction(multicallArgs, flowAmount);
  } else {
    const simulateResult = await simulateContract(config, {
      ...marketsInstance,
      functionName: "repay",
      args: [
        [
          marketParams.isPremiumMarket,
          marketParams.loanToken,
          marketParams.collateralToken,
          marketParams.oracle,
          marketParams.irm,
          marketParams.lltv,
          marketParams.creditAttestationService,
          marketParams.irxMaxLltv,
          marketParams.categoryLltv,
        ],
        useShare ? 0 : repayAmount,
        useShare ? item.borrowShares : 0,
        account,
        "",
      ],
      gas: parseUnits(gasLimit, 6),
    });

    return await writeContract(config, simulateResult.request);
  }
};

export const repayLoanToMarkets = async (
  account: string,
  repayAmount: bigint,
  nonce: number,
  deadline: bigint,
  signhash: string,
  useShare: boolean,
  item: BorrowPosition
): Promise<string> => {
  let multicallArgs: string[] = [];
  const marketParams = item.marketParams;
  const repayToken = item.borrowedToken.id;

  // encode approve2
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "approve2",
      args: [
        [
          [repayToken, repayAmount, Uint48Max, nonce],
          contracts.MORE_BUNDLER,
          deadline,
        ],
        signhash,
        false,
      ],
    })
  );

  // encode transferFrom2
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "transferFrom2",
      args: [repayToken, repayAmount],
    })
  );

  // encode morphoRepay
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "morphoRepay",
      args: [
        [
          marketParams.isPremiumMarket,
          marketParams.loanToken,
          marketParams.collateralToken,
          marketParams.oracle,
          marketParams.irm,
          marketParams.lltv,
          marketParams.creditAttestationService,
          marketParams.irxMaxLltv,
          marketParams.categoryLltv,
        ],
        useShare ? 0 : repayAmount,
        useShare ? item.borrowShares : 0,
        0,
        account,
        "",
      ],
    })
  );
  return await executeTransaction(multicallArgs);
};

export const supplyCollateral = async (
  supplyAsset: string,
  account: string,
  signhash: string,
  deadline: bigint,
  supplyAmount: bigint,
  nonce: number,
  marketParams: MarketParams
): Promise<string> => {
  let multicallArgs: string[] = [];
  const supplyFlow = isFlow(supplyAsset);

  // encode approve2
  if (signhash.length > 0) {
    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "approve2",
        args: [
          [
            [supplyAsset, supplyAmount, Uint48Max, nonce],
            contracts.MORE_BUNDLER,
            deadline,
          ],
          signhash,
          false,
        ],
      })
    );
  }

  if (supplyFlow) {
    multicallArgs = addWrapNative(multicallArgs, supplyAmount);
  } else {
    // encode transferFrom2
    multicallArgs.push(
      encodeFunctionData({
        abi: BundlerAbi,
        functionName: "transferFrom2",
        args: [supplyAsset, supplyAmount],
      })
    );
  }

  // encode morphoSupplyCollateral
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "morphoSupplyCollateral",
      args: [
        [
          marketParams.isPremiumMarket,
          marketParams.loanToken,
          marketParams.collateralToken,
          marketParams.oracle,
          marketParams.irm,
          marketParams.lltv,
          marketParams.creditAttestationService,
          marketParams.irxMaxLltv,
          marketParams.categoryLltv,
        ],
        supplyAmount,
        account,
        "",
      ],
    })
  );
  return await executeTransaction(
    multicallArgs,
    supplyFlow ? supplyAmount : BigInt(0)
  );
};

export const withdrawCollateral = async (
  marketParams: MarketParams,
  amount: bigint,
  account: string,
  supplyToken: string
) => {
  let multicallArgs: string[] = [];
  const supplyflow = isFlow(supplyToken);

  // encode morphoWithdrawCollateral
  multicallArgs.push(
    encodeFunctionData({
      abi: BundlerAbi,
      functionName: "morphoWithdrawCollateral",
      args: [
        [
          marketParams.isPremiumMarket,
          marketParams.loanToken,
          marketParams.collateralToken,
          marketParams.oracle,
          marketParams.irm,
          marketParams.lltv,
          marketParams.creditAttestationService,
          marketParams.irxMaxLltv,
          marketParams.categoryLltv,
        ],
        amount,
        supplyflow ? contracts.MORE_BUNDLER : account,
      ],
    })
  );

  if (supplyflow) multicallArgs = addUnwrapNative(multicallArgs, account);
  return await executeTransaction(multicallArgs);
};

// ******************************************
export const fetchVaults = async (): Promise<GraphVault[]> => {
  const promises = vaultIds.map(async (vaultId: string) => {
    const vaultContract = {
      address: vaultId as `0x${string}`,
      abi: VaultsAbi,
    };

    const vaultInfos = await readContracts(config, {
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
          functionName: "guardian",
        },
        {
          ...vaultContract,
          functionName: "supplyQueueLength",
        },
        {
          ...vaultContract,
          functionName: "timelock",
        },
      ],
    });

    const supplyQueueLen = getVauleNum(vaultInfos[4]);
    let supplyQueues: any[] = [];
    for (let ii = 0; ii < supplyQueueLen; ii++) {
      supplyQueues.push({
        ...vaultContract,
        functionName: "supplyQueue",
        args: [ii],
      });
    }
    const supplyMarketIds = await readContracts(config, {
      contracts: supplyQueues,
    });
    const queueIds = supplyMarketIds.map((supplyMarketId) => {
      return {
        market: {
          id: getVaule(supplyMarketId),
        },
      };
    });

    return {
      id: vaultId,
      supplyQueue: queueIds,
      name: vaultInfos[0].result,
      curator: {
        id: vaultInfos[1].result,
      },
      asset: {
        id: vaultInfos[2].result,
      },
      lastTotalAssets: "",
      totalShares: "",
      guardian: {
        id: vaultInfos[3].result == ZeroAddress ? "-" : "Guardian",
      },
      timelock: vaultInfos[5].result,
    } as GraphVault;
  });

  return await Promise.all(promises);
};

export const fetchVault = async (vaultId: string): Promise<GraphVault> => {
  const vaultContract = {
    address: vaultId as `0x${string}`,
    abi: VaultsAbi,
  };

  const vaultInfos = await readContracts(config, {
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
        functionName: "guardian",
      },
      {
        ...vaultContract,
        functionName: "supplyQueueLength",
      },
      {
        ...vaultContract,
        functionName: "timelock",
      },
    ],
  });

  const supplyQueueLen = getVauleNum(vaultInfos[4]);
  let supplyQueues: any[] = [];
  for (let ii = 0; ii < supplyQueueLen; ii++) {
    supplyQueues.push({
      ...vaultContract,
      functionName: "supplyQueue",
      args: [ii],
    });
  }
  const supplyMarketIds = await readContracts(config, {
    contracts: supplyQueues,
  });
  const queueIds = supplyMarketIds.map((supplyMarketId) => {
    return {
      market: {
        id: getVaule(supplyMarketId),
      },
    };
  });

  return {
    id: vaultId,
    supplyQueue: queueIds,
    name: vaultInfos[0].result,
    curator: {
      id: vaultInfos[1].result,
    },
    asset: {
      id: vaultInfos[2].result,
    },
    lastTotalAssets: "",
    totalShares: "",
    guardian: {
      id: vaultInfos[3].result == ZeroAddress ? "-" : "Guardian",
    },
    timelock: vaultInfos[5].result,
  } as GraphVault;
};

export const fetchMarkets = async (): Promise<GraphMarket[]> => {
  const promises = marketIds.map(async (marketId) => {
    const marketParams = await getMarketParams(marketId);

    return {
      id: marketId,
      inputToken: {
        id: marketParams.collateralToken,
      },
      borrowedToken: {
        id: marketParams.loanToken,
      },
      lltv: marketParams.lltv,
      totalSupply: "",
      totalBorrow: "",
    } as GraphMarket;
  });

  return await Promise.all(promises);
};

export const fetchMarket = async (marketId: string): Promise<GraphMarket> => {
  const marketParams = await getMarketParams(marketId);

  return {
    id: marketId,
    inputToken: {
      id: marketParams.collateralToken,
    },
    borrowedToken: {
      id: marketParams.loanToken,
    },
    lltv: marketParams.lltv,
    totalSupply: "",
    totalBorrow: "",
  } as GraphMarket;
};
// ******************************************
