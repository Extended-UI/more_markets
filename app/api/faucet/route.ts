import _ from "lodash";
import { encodeFunctionData } from "viem";
import { JsonRpcProvider, Wallet, parseUnits } from "ethers";
import { NextResponse, NextRequest } from "next/server";

import { contracts, tokens } from "@/utils/const";
import { ERC20Abi } from "../../abi/ERC20Abi";
import { MulticallAbi } from "../../abi/Multicall";

const provider = new JsonRpcProvider("https://testnet.evm.nodes.onflow.org/");
const faucetWallet = new Wallet(process.env.faucet_key as string, provider);
const faucetWallet1 = new Wallet(process.env.faucet_key1 as string, provider);

interface IMintRequet {
  target: string;
  callData: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const params = await req.json();
  const paramWallet = params.wallet;

  if (paramWallet) {
    try {
      // then mint tokens
      let reqList: IMintRequet[] = [];
      _.forOwn(tokens, async (value, token) => {
        const amount = parseUnits("1000", value.decimals);
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

      const mintTx = faucetWallet1.sendTransaction({
        to: contracts.MULTICALL3,
        data: mintTxRequest,
      });
      (await mintTx).wait();

      // transfer flow
      const tx = await faucetWallet.sendTransaction({
        to: paramWallet,
        value: parseUnits("1"),
      });
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  }

  return NextResponse.json({ params });
}
