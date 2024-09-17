"use client";

import React, { useState, useEffect } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import Icon from "../../FontAwesomeIcon";
import MoreButton from "../../moreButton/MoreButton";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { config } from "@/utils/wagmi";
import { getTokenInfo, getPremiumLltv, formatTokenValue } from "@/utils/utils";

interface Props {
  item: BorrowPosition;
  txhash: string;
  amount: number;
  closeModal: () => void;
  processDone: () => void;
}

const VaultAddResult: React.FC<Props> = ({
  item,
  txhash,
  amount,
  processDone,
}) => {
  const [executed, setExecuted] = useState(false);

  const collateralToken = getTokenInfo(
    item.marketParams.collateralToken
  ).symbol;
  const loanToken = getTokenInfo(item.marketParams.loanToken).symbol;

  useEffect(() => {
    const waitTx = async () => {
      setExecuted(false);

      try {
        if (txhash.length > 0) {
          await waitForTransactionReceipt(config, {
            hash: txhash as `0x${string}`,
          });
          setExecuted(true);
        }
      } catch (err) {
        console.log(err);
        setExecuted(true);
      }
    };

    waitTx();
  }, [txhash]);

  const txHashStr =
    txhash.substring(0, 5) + "..." + txhash.substring(txhash.length - 4);

  return (
    <div className="more-bg-secondary rounded-[20px] h-full w-full px-4">
      <div className="mb-10 pt-10 text-4xl">Transaction Confirmation</div>
      <div className="flex flex-row justify-between mt-4 items-center">
        <div className="flex items-center mb-10  gap-2">
          <ListIconToken
            iconNames={[
              item.marketParams.collateralToken,
              item.marketParams.loanToken,
            ]}
            className="w-8 h-8"
          />
          <div className="text-2xl   flex items-center'">
            {" "}
            {collateralToken} / {loanToken}
          </div>
        </div>
        <div className="flex gap-2 text-l mb-5 px-4">
          <span className="more-text-gray">Liquidation LTV:</span>{" "}
          <FormatTwoPourcentage
            value={formatTokenValue(BigInt(item.lltv), "", 18)}
            value2={getPremiumLltv(item.marketParams)}
          />
        </div>
      </div>

      <div className="more-bg-primary rounded-[5px] mb-5 py-8 px-4 mx-5 ">
        Add {amount} {collateralToken} to Market
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
        <div className="mx-10 my-5 p-2 text-secondary border border-secondary border-dashed border-1 rounded-xl">
          Confirming transaction... Browse MORE vaults while you wait.
        </div>
        {executed && (
          <div className="flex justify-end mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Done"
              onClick={processDone}
              color="gray"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultAddResult;
