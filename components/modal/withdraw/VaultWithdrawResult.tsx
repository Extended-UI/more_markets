"use client";

import React, { useState, useEffect } from "react";
import MoreButton from "../../moreButton/MoreButton";
import Icon from "../../FontAwesomeIcon";
import { InvestmentData } from "@/types";
import { getTokenInfo, notifyError } from "@/utils/utils";
import { waitForTransaction } from "@/utils/contract";

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
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
      <div className="text-[24px] mb-[40px] font-semibold">Transaction Confirmation</div>
      <div className="more-bg-primary text-[#888] rounded-[12px] p-[20px] text-[20px] font-normal">
        Withdraw {amount} {tokenInfo.symbol} from Vault
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
