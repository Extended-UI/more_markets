import { Chain } from "@rainbow-me/rainbowkit";
import { injected } from "wagmi/connectors";
import { http, createConfig } from "wagmi";
import { contracts } from "./const";

const flowMainnet = {
  id: 747,
  name: "EVM on Flow",
  iconUrl:
    "https://cdn.prod.website-files.com/5f734f4dbd95382f4fdfa0ea/616b1520779838b5f9174363_favicon.png",
  nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://flow-mainnet.g.alchemy.com/v2/giF5d0sHzxK4OoanZ-rwx6Z-jpLMuB1S",
        "https://mainnet.evm.nodes.onflow.org",
      ],
    },
  },
  contracts: {
    multicall3: {
      address: contracts.MULTICALL3 as `0x${string}`,
    },
  },
  blockExplorers: {
    default: {
      name: "Flow ",
      url: "https://evm.flowscan.io",
      apiUrl: "https://evm.flowscan.io/api",
    },
  },
  testnet: true,
} as const satisfies Chain;

// Create wagmiConfig
export const config = createConfig({
  chains: [flowMainnet],
  connectors: [injected()],
  transports: {
    // [flowMainnet.id]: http("https://mainnet.evm.nodes.onflow.org"),
    [flowMainnet.id]: http(
      "https://flow-mainnet.g.alchemy.com/v2/giF5d0sHzxK4OoanZ-rwx6Z-jpLMuB1S"
    ),
  },
  ssr: true,
  pollingInterval: 30_000,
});
