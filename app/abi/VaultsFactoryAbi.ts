import { Abi } from "viem";

export const VaultsFactoryAbi: Abi = [
  {
    type: "constructor",
    inputs: [
      { name: "moreMarkets", type: "address", internalType: "address" },
      {
        name: "_moreVaultsImpl",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "MORE_MARKETS",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "arrayOfVaults",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createMetaMorpho",
    inputs: [
      {
        name: "initialOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "initialTimelock",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "asset", type: "address", internalType: "address" },
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "salt", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [
      {
        name: "metaMorpho",
        type: "address",
        internalType: "contract IMetaMorpho",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isMetaMorpho",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "moreVaultsImpl",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pendingOwner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "premiumFeeInfo",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "feeRecipient",
        type: "address",
        internalType: "address",
      },
      { name: "fee", type: "uint96", internalType: "uint96" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeInfo",
    inputs: [
      { name: "vault", type: "address", internalType: "address" },
      {
        name: "_feeInfo",
        type: "tuple",
        internalType: "struct PremiumFeeInfo",
        components: [
          {
            name: "feeRecipient",
            type: "address",
            internalType: "address",
          },
          { name: "fee", type: "uint96", internalType: "uint96" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CreateMetaMorpho",
    inputs: [
      {
        name: "metaMorpho",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "caller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "initialOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "initialTimelock",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "salt",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferStarted",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SetPremiumFeeInfo",
    inputs: [
      {
        name: "vault",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "_premiumFeeInfo",
        type: "tuple",
        indexed: true,
        internalType: "struct PremiumFeeInfo",
        components: [
          {
            name: "feeRecipient",
            type: "address",
            internalType: "address",
          },
          { name: "fee", type: "uint96", internalType: "uint96" },
        ],
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "MaxFeeExceeded", inputs: [] },
  { type: "error", name: "NotTheVault", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  { type: "error", name: "ZeroAddress", inputs: [] },
] as const;
