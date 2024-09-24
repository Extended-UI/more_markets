"use client";

import React, { useEffect, useState } from "react";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import { InvestmentData } from "@/types";
import { notifyError } from "@/utils/utils";
import { waitForTransaction } from "@/utils/contract";

interface Props {
  amount: number;
  txhash: string;
  item: InvestmentData;
  closeModal: () => void;
  processDone: () => void;
}

const VaultDepositResult: React.FC<Props> = ({
  item,
  amount,
  txhash,
  processDone,
}) => {
  const [executed, setExecuted] = useState(false);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  useEffect(() => {
    const waitTx = async () => {
      setExecuted(false);
      try {
        if (txhash.length > 0) {
          await waitForTransaction(txhash);
          setExecuted(true);
        }
      } catch (err) {
        setExecuted(true);
        notifyError(err);
      }
    };

    waitTx();
  }, [txhash]);

  return (
    <div className="more-bg-secondary h-full rounded-[20px]">
      <div className="text-xl mb-10 px-4 pt-5">Transaction Confirmation</div>
      <div className="text-l mb-5 px-4">
        <span>
          <Icon
            icon="circle-check"
            className="text-secondary text-xl cursor-pointer mr-5"
          />
        </span>
        Execute the following actions
      </div>
      <div className="more-bg-primary px-4 mx-5">
        <TokenAmount
          title="Deposit"
          token={item.assetAddress}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      {txhash.length > 0 && (
        <>
          <div className="text-l my-5 px-4">
            <span>
              {executed ? (
                <Icon
                  icon="circle-check"
                  className="text-secondary text-xl cursor-pointer mr-5"
                />
              ) : (
                <Icon icon="circle" className="text-xl cursor-pointer mr-5" />
              )}
            </span>
            {executed ? (
              <>Transaction {txHashStr} has been successfully executed.</>
            ) : (
              <>Transaction {txHashStr} has been sent.</>
            )}
          </div>
        </>
      )}
      <div className="more-bg-primary px-4  py-2 rounded-b-[20px]">
        {executed ? (
          <div className="flex justify-end mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Done"
              onClick={processDone}
              color="primary"
            />
          </div>
        ) : (
          <div className="mx-10 my-5 p-2 text-secondary border border-secondary border-dashed border-1 rounded-xl">
            Confirming transaction... Browse MORE vaults while you wait.
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultDepositResult;
