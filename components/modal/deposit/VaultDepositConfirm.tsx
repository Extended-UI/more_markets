"use client";

import React from "react";
import { useAccount } from "wagmi";
import { parseEther } from "ethers";
import { writeContract, waitForTransaction } from "@wagmi/core";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import IconToken from "@/components/token/IconToken";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { InvestmentData } from "@/types";
import { config } from "@/utils/wagmi";
import { MorphoAbi } from "@/app/abi/MorphoAbi";
import { contracts } from "@/utils/const";

interface Props {
  item: InvestmentData;
  amount: number;
  closeModal: () => void;
  validDeposit: () => void;
  setTxhash: (hash: string) => void;
}

const VaultDepositConfirm: React.FC<Props> = ({
  item,
  amount,
  setTxhash,
  validDeposit,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();
  const handleDeposit = async () => {
    // generate deposit tx
    if (item.market) {
      const hash = await writeContract(config, {
        address: contracts.MORE_MARKETS as `0x${string}`,
        abi: MorphoAbi,
        functionName: "supply",
        args: [
          item.market.params,
          parseEther(amount.toString()),
          0,
          userAddress,
          "",
        ],
      });

      setTxhash(hash);
      validDeposit();
    } else {
      alert("No supply queue");
    }
  };

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full">
      <div className="mb-10 px-4 pt-8  text-2xl">Review Transaction</div>
      <div className="text-l mb-1 px-5 pb-4">{item.vaultName}</div>
      <div className="flex flex-row justify-between items-center px-2">
        <div className="text-l flex items-center gap-2 flex mb-5 px-4">
          <span className="more-text-gray">Curator:</span>
          <IconToken
            className="w-6 h-6"
            tokenName={item.tokenSymbol}
          ></IconToken>
          <span>{item.curator}</span>
        </div>
        <div className="flex  gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Liquidation LTV:</span>{" "}
          <FormatTwoPourcentage
            value={item.netAPY}
            value2={item.netAPY}
          ></FormatTwoPourcentage>{" "}
        </div>
      </div>
      <div className="more-bg-primary rounded-[5px] mx-5 px-4 ">
        <TokenAmount
          title="Deposit"
          token={item.tokenSymbol}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      <div className="py-5 px-5">
        By confirming this transaction, you agree to the{" "}
        <a className="underline" href="#goto">
          Terms of Use
        </a>{" "}
        and the services provisions relating to the MORE Protocol Vault.
      </div>
      <div className="flex justify-end py-5 more-bg-primary rounded-b-[20px] px-4">
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        <MoreButton
          className="text-2xl py-2"
          text="Deposit"
          onClick={() => handleDeposit()}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultDepositConfirm;
