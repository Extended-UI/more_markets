import { Abi } from "viem";

export const CredoraMetricsAbi: Abi = [
  {
    inputs: [
      { internalType: "address", name: "router", type: "address" },
      { internalType: "bytes32", name: "_donId", type: "bytes32" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "EmptyArgs", type: "error" },
  { inputs: [], name: "EmptySource", type: "error" },
  { inputs: [], name: "NoInlineSecrets", type: "error" },
  { inputs: [], name: "OnlyRouterCanFulfill", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "entity",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "score",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "nav",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes8",
        name: "rae",
        type: "bytes8",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "borrowCapacity",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "impliedPD",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "impliedPDTenor",
        type: "uint64",
      },
    ],
    name: "EntityDatad",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Log",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "donId",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "getBorrowCapacity",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "getImpliedPD",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "getImpliedPDTenor",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "getNAV",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "getRAE",
    outputs: [{ internalType: "bytes8", name: "", type: "bytes8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "getScore",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "entity", type: "address" },
      { internalType: "address", name: "thirdParty", type: "address" },
      { internalType: "uint128", name: "duration", type: "uint128" },
    ],
    name: "grantPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "entity", type: "address" },
      { internalType: "address", name: "thirdParty", type: "address" },
      { internalType: "uint128", name: "duration", type: "uint128" },
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "tokenSender", type: "address" },
    ],
    name: "grantPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "requestId", type: "bytes32" },
      { internalType: "bytes", name: "response", type: "bytes" },
      { internalType: "bytes", name: "err", type: "bytes" },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recipient",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      {
        internalType: "address",
        name: "callerConfirmation",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastError",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastRequestId",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastResponse",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "source", type: "string" },
      {
        internalType: "enum FunctionsRequest.Location",
        name: "secretsLocation",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "encryptedSecretsReference",
        type: "bytes",
      },
      { internalType: "string[]", name: "args", type: "string[]" },
      {
        internalType: "address[]",
        name: "paymentDirections",
        type: "address[]",
      },
      { internalType: "uint64", name: "subscriptionId", type: "uint64" },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
    ],
    name: "sendRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "requestId", type: "bytes32" },
      { internalType: "bytes", name: "data", type: "bytes" },
      { internalType: "bytes", name: "err", type: "bytes" },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "newDonId", type: "bytes32" }],
    name: "setDonId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requiredPayment",
        type: "uint256",
      },
    ],
    name: "setFeeDataRefresh",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requiredPayment",
        type: "uint256",
      },
    ],
    name: "setFeePermissionGrant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "entity", type: "address" },
      {
        internalType: "address",
        name: "subscribedContract",
        type: "address",
      },
      { internalType: "uint128", name: "duration", type: "uint128" },
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "tokenSender", type: "address" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "entity", type: "address" },
      {
        internalType: "address",
        name: "subscribedContract",
        type: "address",
      },
      { internalType: "uint128", name: "duration", type: "uint128" },
    ],
    name: "subscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "testAccessData",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "entity", type: "address" }],
    name: "triggerCallbacks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "entity", type: "address" },
      {
        internalType: "address",
        name: "subscribedContract",
        type: "address",
      },
    ],
    name: "unsubscribe",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
