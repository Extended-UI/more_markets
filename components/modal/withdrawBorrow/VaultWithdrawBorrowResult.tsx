"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { getTokenInfo, notifyError } from "@/utils/utils";
import { waitForTransaction } from "@/utils/contract";

interface Props {
  item: BorrowPosition;
  amount: number;
  txhash: string;
  processDone: () => void;
}

const VaultWithdrawBorrowResult: React.FC<Props> = ({
  item,
  txhash,
  amount,
  processDone,
}) => {
  const [executed, setExecuted] = useState(false);

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

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
       <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Transaction Confirmation</div>
      <div className="flex items-center mb-[30px] font-semibold text-[20px] gap-2">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="flex items-center">
          {collateralToken} / {loanToken}
        </div>
      </div>

      <div className="relative more-bg-primary text-[16px] rounded-[12px] p-[20px] mb-6">
        Withdraw {amount} {collateralToken}
      </div>

      {txhash.length > 0 && (
        <div className="text-[20px] font-medium mb-6 mt-[40px]">
          <span>
            {executed ? (
              <Icon
                icon="circle-check"
                className="text-secondary  cursor-pointer w-[30px] h-[30px] mr-5"
              />
            ) : (
              <Icon icon="circle" className=" cursor-pointer w-[30px] h-[30px] mr-5" />
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
          <div className="flex justify-end ">
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

export default VaultWithdrawBorrowResult;
