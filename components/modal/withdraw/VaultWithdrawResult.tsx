"use client";

import React, { useState, useEffect } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import MoreButton from "../../moreButton/MoreButton";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { InvestmentData } from "@/types";
import { config } from "@/utils/wagmi";
import { getTokenInfo } from "@/utils/utils";

interface Props {
  amount: number;
  hash: string;
  item: InvestmentData;
  processDone: () => void;
  closeModal: () => void;
}

const VaultWithdrawResult: React.FC<Props> = ({
  item,
  hash,
  amount,
  processDone,
  closeModal,
}) => {
  const [executed, setExecuted] = useState(false);

  const hashStr =
    hash.substring(0, 5) + "..." + hash.substring(hash.length - 4);

  const tokenInfo = getTokenInfo(item.assetAddress);

  useEffect(() => {
    const waitTx = async () => {
      setExecuted(false);

      if (hash.length > 0) {
        await waitForTransactionReceipt(config, {
          hash: hash as `0x${string}`,
        });

        setExecuted(true);
        processDone();
      }
    };
    waitTx();
  }, [hash]);

  return (
    <div className="more-bg-secondary h-full rounded-[20px]">
      <div className="text-3xl mb-10 px-4 pt-10 ">Transaction Confirmation</div>
      <div className="more-bg-primary rounded-[5px] mb-5 py-8 px-4 mx-5 ">
        Withdraw {amount} {tokenInfo.symbol} from Vault
      </div>

      {hash.length > 0 && (
        <>
          <div className="flex items-center text-2xl mb-5 px-4">
            <span>
              <CheckCircleIcon className="text-secondary text-xl cursor-pointer w-10 h-10 mr-5" />
            </span>
            {executed ? (
              <>Transaction {hashStr} has been successfully executed.</>
            ) : (
              <>Transaction {hashStr} has been sent.</>
            )}
          </div>
          {executed && (
            <div className="flex justify-end py-5 rounded-b-[20px] px-4">
              <div className="mr-5">
                <MoreButton
                  className="text-2xl py-2"
                  text="Done"
                  onClick={closeModal}
                  color="secondary"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VaultWithdrawResult;
