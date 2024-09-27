"use client";

import React, { useState, useEffect } from "react";
import MoreButton from "../../moreButton/MoreButton";
import Icon from "../../FontAwesomeIcon";
import { InvestmentData } from "@/types";
import { waitForTransaction } from "@/utils/contract";
import { getTokenInfo, notifyError } from "@/utils/utils";

interface Props {
  amount: number;
  txhash: string;
  item: InvestmentData;
  processDone: () => void;
}

const VaultWithdrawResult: React.FC<Props> = ({
  item,
  txhash,
  amount,
  processDone,
}) => {
  const [executed, setExecuted] = useState(false);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  const tokenInfo = getTokenInfo(item.assetAddress);

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
      <div className="text-3xl mb-10 px-4 pt-10">Transaction Confirmation</div>
      <div className="more-bg-primary rounded-[5px] mb-5 py-8 px-4 mx-5">
        Withdraw {amount} {tokenInfo.symbol} from Vault
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

export default VaultWithdrawResult;
