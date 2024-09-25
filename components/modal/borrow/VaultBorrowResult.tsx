"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "@/components/token/TokenAmount";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { BorrowPosition } from "@/types";
import { notifyError } from "@/utils/utils";
import { waitForTransaction } from "@/utils/contract";

interface Props {
  txhash: string;
  item: BorrowPosition;
  supplyAmount: number;
  borrowAmount: number;
  processDone: () => void;
}

const VaultBorrowResult: React.FC<Props> = ({
  item,
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
        notifyError(err);
      }
    };

    waitTx();
  }, [txhash]);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  return (
    <div className="more-bg-secondary h-full rounded-[20px]">
      <div className="text-xl mb-10 px-4 pt-5">Transaction Confirmation</div>
      <div className="text-l flex mb-5 px-4">
        <span>
          <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-8 h-8 mr-5" />
        </span>
        Executed the following actions
      </div>
      {supplyAmount > 0 && (
        <div className="more-bg-primary px-4 mx-5">
          <TokenAmount
            title="Supply"
            token={item.inputToken.id}
            amount={supplyAmount}
            ltv={"ltv"}
            totalTokenAmount={supplyAmount}
          />
        </div>
      )}
      <div className="more-bg-primary px-4 mx-5">
        <TokenAmount
          title="Borrow"
          token={item.borrowedToken.id}
          amount={borrowAmount}
          ltv={"ltv"}
          totalTokenAmount={borrowAmount}
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
      <div className="more-bg-primary px-4  py-2  rounded-b-[20px]">
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

export default VaultBorrowResult;
