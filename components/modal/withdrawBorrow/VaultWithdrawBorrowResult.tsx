"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { getTokenInfo, notifyError } from "@/utils/utils";
import { MoreAction } from "@/utils/const";
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
        notifyError(err, MoreAction.WITHDRAW_COLLATERAL);
      }
    };

    waitTx();
  }, [txhash]);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;

  return (
    <div className="more-bg-secondary h-full rounded-[20px]">
      <div className="text-xl mb-10 px-4 pt-5">Transaction Confirmation</div>
      <div className="flex items-center mb-10 px-8 gap-2">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center">
          {collateralToken} / {loanToken}
        </div>
      </div>

      <div className="more-bg-primary rounded-[5px] mb-5 py-8 px-4 mx-5">
        Withdraw {amount} {collateralToken}
      </div>

      {txhash.length > 0 && (
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

export default VaultWithdrawBorrowResult;
