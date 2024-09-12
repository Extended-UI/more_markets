import { Abi } from "viem";

export const BundlerAbi: Abi = [
  {
    type: "constructor",
    inputs: [{ name: "morpho", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "MORPHO",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IMoreMarketsBase",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve2",
    inputs: [
      {
        name: "permitSingle",
        type: "tuple",
        internalType: "struct IAllowanceTransfer.PermitSingle",
        components: [
          {
            name: "details",
            type: "tuple",
            internalType: "struct IAllowanceTransfer.PermitDetails",
            components: [
              {
                name: "token",
                type: "address",
                internalType: "address",
              },
              {
                name: "amount",
                type: "uint160",
                internalType: "uint160",
              },
              {
                name: "expiration",
                type: "uint48",
                internalType: "uint48",
              },
              { name: "nonce", type: "uint48", internalType: "uint48" },
            ],
          },
          { name: "spender", type: "address", internalType: "address" },
          {
            name: "sigDeadline",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      { name: "signature", type: "bytes", internalType: "bytes" },
      { name: "skipRevert", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc20Transfer",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "recipient", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc20TransferFrom",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc20WrapperDepositFor",
    inputs: [
      { name: "wrapper", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc20WrapperWithdrawTo",
    inputs: [
      { name: "wrapper", type: "address", internalType: "address" },
      { name: "account", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc4626Deposit",
    inputs: [
      { name: "vault", type: "address", internalType: "address" },
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "minShares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc4626Mint",
    inputs: [
      { name: "vault", type: "address", internalType: "address" },
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "maxAssets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc4626Redeem",
    inputs: [
      { name: "vault", type: "address", internalType: "address" },
      { name: "shares", type: "uint256", internalType: "uint256" },
      { name: "minAssets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "erc4626Withdraw",
    inputs: [
      { name: "vault", type: "address", internalType: "address" },
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "maxShares", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "initiator",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "morphoBorrow",
    inputs: [
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
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "shares", type: "uint256", internalType: "uint256" },
      {
        name: "slippageAmount",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoFlashLoan",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoRepay",
    inputs: [
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
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "shares", type: "uint256", internalType: "uint256" },
      {
        name: "slippageAmount",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "onBehalf", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoSetAuthorizationWithSig",
    inputs: [
      {
        name: "authorization",
        type: "tuple",
        internalType: "struct Authorization",
        components: [
          {
            name: "authorizer",
            type: "address",
            internalType: "address",
          },
          {
            name: "authorized",
            type: "address",
            internalType: "address",
          },
          { name: "isAuthorized", type: "bool", internalType: "bool" },
          { name: "nonce", type: "uint256", internalType: "uint256" },
          { name: "deadline", type: "uint256", internalType: "uint256" },
        ],
      },
      {
        name: "signature",
        type: "tuple",
        internalType: "struct Signature",
        components: [
          { name: "v", type: "uint8", internalType: "uint8" },
          { name: "r", type: "bytes32", internalType: "bytes32" },
          { name: "s", type: "bytes32", internalType: "bytes32" },
        ],
      },
      { name: "skipRevert", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoSupply",
    inputs: [
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
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "shares", type: "uint256", internalType: "uint256" },
      {
        name: "slippageAmount",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "onBehalf", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoSupplyCollateral",
    inputs: [
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
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "onBehalf", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoWithdraw",
    inputs: [
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
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "shares", type: "uint256", internalType: "uint256" },
      {
        name: "slippageAmount",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "morphoWithdrawCollateral",
    inputs: [
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
      { name: "assets", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [{ name: "data", type: "bytes[]", internalType: "bytes[]" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "nativeTransfer",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "onMorphoFlashLoan",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onMorphoRepay",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onMorphoSupply",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onMorphoSupplyCollateral",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "permit",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
      { name: "skipRevert", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "reallocateTo",
    inputs: [
      {
        name: "publicAllocator",
        type: "address",
        internalType: "address",
      },
      { name: "vault", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "withdrawals",
        type: "tuple[]",
        internalType: "struct Withdrawal[]",
        components: [
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
              {
                name: "oracle",
                type: "address",
                internalType: "address",
              },
              { name: "irm", type: "address", internalType: "address" },
              {
                name: "lltv",
                type: "uint256",
                internalType: "uint256",
              },
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
          { name: "amount", type: "uint128", internalType: "uint128" },
        ],
      },
      {
        name: "supplyMarketParams",
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
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "transferFrom2",
    inputs: [
      { name: "asset", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  { type: "error", name: "UnsafeCast", inputs: [] },
];