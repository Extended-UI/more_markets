"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { BorrowPosition } from "@/types";
import { notifyError } from "@/utils/utils";
import { MoreAction } from "@/utils/const";
import { waitForTransaction } from "@/utils/contract";

interface Props {
  txhash: string;
  onlyBorrow?: boolean;
  item: BorrowPosition;
  supplyAmount: number;
  borrowAmount: number;
  processDone: () => void;
}

const VaultBorrowResult: React.FC<Props> = ({
  item,
  onlyBorrow,
  supplyAmount,
  borrowAmount,
  txhash,
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
        notifyError(
          err,
          onlyBorrow ? MoreAction.BORROW_MORE : MoreAction.BORROW
        );
      }
    };

    waitTx();
  }, [txhash]);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Transaction Confirmation</div>
      <div className="text-[20px] font-medium mb-[40px] flex items-center">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-[30px] !h-[30px] mr-5" />
        </span>
        Executed the following actions
      </div>
      {supplyAmount > 0 && (
        <div className="more-bg-primary rounded-[12px] p-[20px] mb-6">
          <TokenAmount
            title="Supply"
            token={item.inputToken.id}
            amount={supplyAmount}
            ltv={"ltv"}
            totalTokenAmount={supplyAmount}
          />
        </div>
      )}
      <div className="more-bg-primary rounded-[12px] p-[20px] mb-6">
        <TokenAmount
          title="Borrow"
          token={item.borrowedToken.id}
          amount={borrowAmount}
          ltv={"ltv"}
          totalTokenAmount={borrowAmount}
        />
      </div>
      {txhash.length > 0 && (
        <div className="text-[20px] flex items-center font-medium mb-6 mt-[40px]">
          <span >
            {executed ? (
              <Icon
                icon="circle-check"
                className="text-secondary text-xl cursor-pointer mr-5 w-[30px] !h-[30px]"
              />
            ) : (
              <Icon icon="circle" className="text-xl cursor-pointer mr-5 w-[30px] !h-[30px]"/>
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
          <div className="flex justify-end mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Done"
              onClick={processDone}
              color="primary"
            />
          </div>
        ) : (
          <div className="text-secondary p-5 border border-secondary border-dashed border-1 rounded-[12px]">
            Confirming transaction... Browse MORE vaults while you wait.
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultBorrowResult;
