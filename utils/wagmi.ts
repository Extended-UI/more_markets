import { Chain } from "@rainbow-me/rainbowkit";
import { injected } from "wagmi/connectors";
import { http, createConfig } from "wagmi";
import { contracts } from "./const";

const flowTestnet = {
  id: 545,
  name: "FlowTestnet",
  iconUrl:
    "https://cdn.prod.website-files.com/5f734f4dbd95382f4fdfa0ea/616b1520779838b5f9174363_favicon.png",
  nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.evm.nodes.onflow.org/"],
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
      url: "https://evm-testnet.flowscan.io",
      apiUrl: "https://evm-testnet.flowscan.io/api",
    },
  },
  testnet: true,
} as const satisfies Chain;

// Create wagmiConfig
export const config = createConfig({
  chains: [flowTestnet],
  connectors: [injected()],
  transports: {
    [flowTestnet.id]: http("https://testnet.evm.nodes.onflow.org"),
  },
  ssr: true,
  pollingInterval: 30_000,
});
