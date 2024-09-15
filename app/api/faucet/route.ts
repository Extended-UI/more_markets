import _ from "lodash";
import { encodeFunctionData } from "viem";
import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import { JsonRpcProvider, Wallet, Contract, parseUnits } from "ethers";
import { NextResponse, NextRequest } from "next/server";

import { config } from "@/utils/wagmi";
import { contracts, tokens } from "@/utils/const";
import { ERC20Abi } from "../../abi/ERC20Abi";
import { MulticallAbi } from "../../abi/Multicall";

const provider = new JsonRpcProvider("https://testnet.evm.nodes.onflow.org/");
const faucetWallet = new Wallet(process.env.faucet_key as string, provider);
const multicallContract = new Contract(
  contracts.MULTICALL3,
  MulticallAbi,
  provider
);

interface IMintRequet {
  target: string;
  callData: string;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function POST(req: NextRequest, res: NextResponse) {
  const params = await req.json();
  const paramWallet = params.wallet;

  if (paramWallet) {
    // transfer flow
    const tx = await faucetWallet.sendTransaction({
      to: paramWallet,
      value: parseUnits("1"),
    });
    await tx.wait();

    // wait for 2sec
    await delay(2000);

    try {
      // then mint tokens
      let reqList: IMintRequet[] = [];
      _.forOwn(tokens, async (value, token) => {
        const decimals = ["USDCf", "USDf"].includes(value)
          ? 6
          : ["BTCf"].includes(value)
          ? 8
          : 18;

        const amount = parseUnits("1000", decimals);
        const mintRequest = encodeFunctionData({
          abi: ERC20Abi,
          functionName: "mint",
          args: [paramWallet, amount],
        });

        reqList.push({
          target: token,
          callData: mintRequest,
        });
      });

      const mintTxRequest = encodeFunctionData({
        abi: MulticallAbi,
        functionName: "aggregate",
        args: [reqList],
      });

      const txHash = faucetWallet.sendTransaction({
        to: contracts.MULTICALL3,
        data: mintTxRequest,
      });
      (await txHash).wait();
    } catch (err) {
      console.log(err);
    }
  }

  return NextResponse.json({ params });
}
