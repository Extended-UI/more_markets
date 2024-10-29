"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import ListIconToken from "@/components/token/ListIconToken";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { IBorrowPosition } from "@/types";
import { MoreAction } from "@/utils/const";
import { waitForTransaction } from "@/utils/contract";
import {
  getTokenInfo,
  getPremiumLltv,
  formatTokenValue,
  notifyError,
} from "@/utils/utils";

interface Props extends IBorrowPosition {
  txhash: string;
  amount: string;
  processDone: () => void;
}

const VaultAddResult: React.FC<Props> = ({
  item,
  txhash,
  amount,
  processDone,
}) => {
  const [executed, setExecuted] = useState(false);

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;

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
        notifyError(err, MoreAction.ADD_COLLATERAL);
      }
    };

    waitTx();
  }, [txhash]);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base">
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
        <div className="text-[24px] mb-[40px] font-semibold">
          Transaction Confirmation
        </div>
        <div className="text-[24px] mb-[40px] font-semibold flex justify-between">
          <div className="flex items-center font-semibold text-[20px] gap-2">
            <ListIconToken
              iconNames={[item.inputToken.id, item.borrowedToken.id]}
              className="w-[24px] h-[24px]"
            />
            <div className="ml-3 flex items-center">
              {collateralToken} / {loanToken}
            </div>
          </div>
          <div className="flex gap-2 text-[16px]">
            <span className="more-text-gray">Liquidation LTV:</span>
            <FormatTwoPourcentage
              value={formatTokenValue(item.lltv, "", 18)}
              value2={getPremiumLltv(item.marketParams)}
            />
          </div>
        </div>

        <div className="relative more-bg-primary rounded-[12px] text-[16px] p-[20px] mb-6">
          Add {amount} {collateralToken} to Market
        </div>

        {txhash.length > 0 && (
          <div className="text-[20px] flex items-center font-medium mb-6 mt-[40px]">
            <span>
              {executed ? (
                <Icon
                  icon="circle-check"
                  className="text-secondary text-xl cursor-pointer  w-[30px] !h-[30px] mr-5"
                />
              ) : (
                <Icon
                  icon="circle"
                  className="text-xl cursor-pointer  w-[30px] !h-[30px] mr-5"
                />
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
          <div className="mx-10 my-5 p-3 text-secondary border border-secondary border-dashed border-1 rounded-xl">
            Confirming transaction... Browse MORE vaults while you wait.
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultAddResult;
