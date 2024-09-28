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
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Transaction Confirmation</div>
      <div className="text-[20px] font-medium mb-6">
        <span>
          <Icon
            icon="circle-check"
            className="text-secondary text-xl cursor-pointer mr-5  w-[20px] !h-[20px]"
          />
        </span>
        Execute the following actions
      </div>
      <div className="more-bg-primary rounded-[12px] p-[20px] mb-6">
        <TokenAmount
          title="Deposit"
          token={item.assetAddress}
          amount={amount}
          ltv={"ltv"}
          totalTokenAmount={item.totalDeposits}
        />
      </div>
      {txhash.length > 0 && (
        <div className="text-[20px] font-medium mb-6 mt-[40px]">
          <span>
            {executed ? (
              <Icon
                icon="circle-check"
                className="text-secondary text-xl cursor-pointer mr-5  w-[20px] !h-[20px]"
              />
            ) : (
              <Icon icon="circle" className="text-xl cursor-pointer mr-5  w-[20px] !h-[20px]" />
            )}
          </span>
          {executed ? (
            <>Transaction {txHashStr} has been successfully executed.</>
          ) : (
            <>Transaction {txHashStr} has been sent.</>
          )}
        </div>
      )}
      
    </div>
    <div className="more-bg-primary rounded-b-[20px] px-[28px] py-[30px]">
        {executed ? (
          <div className="flex justify-end">
            <MoreButton
              className="text-2xl py-2"
              text="Done"
              onClick={processDone}
              color="primary"
            />
          </div>
        ) : (
          <div className=" text-secondary p-5 border border-secondary border-dashed border-1 rounded-[12px]">
            Confirming transaction... Browse MORE vaults while you wait.
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultDepositResult;
