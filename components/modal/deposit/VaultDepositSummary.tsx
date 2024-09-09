"use client";

import React, { useEffect } from "react";
import { waitForTransaction } from "@wagmi/core";
import Icon from "../../FontAwesomeIcon";
import TokenAmount from "@/components/token/TokenAmount";
import { InvestmentData } from "@/types";
import { config } from "@/utils/wagmi";

interface Props {
  item: InvestmentData;
  amount: number;
  hash: string;
  processDone: () => void;
  closeModal: () => void;
}

const VaultDepositSummary: React.FC<Props> = ({
  item,
  amount,
  hash,
  processDone,
  closeModal,
}) => {
  if (hash.length == 0) return null;

  const hashStr =
    hash.substring(0, 5) + "..." + hash.substring(hash.length - 4);

  useEffect(() => {
    const waitTx = async () => {
      if (hash.length > 0) {
        await waitForTransaction(config, { hash: hash as `0x${string}` });
        processDone();
      }
    };
    waitTx();
  }, [hash]);

  return (
    <div className="more-bg-secondary h-full rounded-[20px]">
      <div className="text-xl mb-10 px-4 pt-5 ">Transaction Confirmation</div>
      <div className="text-l mb-5 px-4">
        <span>
          <Icon
            icon="circle-check"
            className="text-secondary text-xl cursor-pointer mr-5"
          />
        </span>
        Execute the following actions
      </div>
      <div className="more-bg-primary px-4 mx-5 ">
        <TokenAmount
          title="Deposit"
          token={item.tokenSymbol}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      <div className="text-l my-5 px-4">
        <span>
          <Icon icon="circle" className="text-xl cursor-pointer mr-5" />
        </span>
        Transaction {hashStr} has been successfully executed.
      </div>
      <div
        className="more-bg-primary px-4  py-2  rounded-b-[20px]"
        onClick={closeModal}
      >
        <div className="mx-10 my-5 p-2 text-secondary border border-secondary border-dashed border-1 rounded-xl">
          Confirming transaction... Browse MORE vaults while you wait.
        </div>
      </div>
    </div>
  );
};

export default VaultDepositSummary;
