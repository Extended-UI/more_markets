import { Abi } from "viem";

export const ApyFeedAbi: Abi = [
  {
    type: "function",
    name: "REGULAR_MULTIPLIER",
    inputs: [],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "SECONDS_PER_YEAR",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getBorrowRate",
    inputs: [
      {
        name: "_moreMarkets",
        type: "address",
        internalType: "address",
      },
      {
        name: "marketParams",
        type: "tuple",
        internalType: "struct MarketParams",
        components: [
          {
            name: "isPremiumMarket",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "loanToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralToken",
            type: "address",
            internalType: "address",
          },
          { name: "oracle", type: "address", internalType: "address" },
          { name: "irm", type: "address", internalType: "address" },
          { name: "lltv", type: "uint256", internalType: "uint256" },
          {
            name: "creditAttestationService",
            type: "address",
            internalType: "address",
          },
          {
            name: "irxMaxLltv",
            type: "uint96",
            internalType: "uint96",
          },
          {
            name: "categoryLltv",
            type: "uint256[]",
            internalType: "uint256[]",
          },
        ],
      },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketSupplyRate",
    inputs: [
      {
        name: "_moreMarkets",
        type: "address",
        internalType: "address",
      },
      {
        name: "marketParams",
        type: "tuple",
        internalType: "struct MarketParams",
        components: [
          {
            name: "isPremiumMarket",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "loanToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralToken",
            type: "address",
            internalType: "address",
          },
          { name: "oracle", type: "address", internalType: "address" },
          { name: "irm", type: "address", internalType: "address" },
          { name: "lltv", type: "uint256", internalType: "uint256" },
          {
            name: "creditAttestationService",
            type: "address",
            internalType: "address",
          },
          {
            name: "irxMaxLltv",
            type: "uint96",
            internalType: "uint96",
          },
          {
            name: "categoryLltv",
            type: "uint256[]",
            internalType: "uint256[]",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "regularSupplyRate",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "premiumSupplyRate",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVaultSupplyRate",
    inputs: [{ name: "vault", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
] as const;
