"use client";

import React, { useState } from "react";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
  setAmount: (amount: number) => void;
  closeModal: () => void;
}

const VaultWithdrawInput: React.FC<Props> = ({
  item,
  setAmount,
  closeModal,
}) => {
  const [withdraw, setWithdraw] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdraw(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setWithdraw(maxValue);
  };

  const handleWithdraw = () => {
    if (withdraw > 0) {
      setAmount(withdraw);
    }
  };

  const balanceString = item.totalDeposits.toString();

  return (
    <div className="more-bg-secondary w-full pt-8 rounded-[20px]">
      <div className="px-6">
        <div className="text-3xl mb-10 pt-5 ">{item.tokenSymbol}</div>
        <div className="text-l mb-5">Withdraw {item.tokenSymbol}</div>
        <div className="w-full flex justify-center">
          <InputTokenMax
            type="number"
            value={withdraw}
            onChange={handleInputChange}
            min="0"
            max={balanceString}
            placeholder={`Withdraw ${item.tokenSymbol}`}
            token={item.tokenSymbol}
            balance={item.totalDeposits}
            setMax={handleSetMax}
          />
        </div>
        <div className="flex justify-end mt-7 mb-7">
          <div className="mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Cancel"
              onClick={closeModal}
              color="gray"
            />
          </div>
          <MoreButton
            className="text-2xl py-2"
            text="Withdraw"
            onClick={() => handleWithdraw()}
            color="primary"
          />
        </div>
        <div className="w-[50%] mx-15 flex justify-center mx-auto">
          <div className="glowing-text-primary w-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-between more-bg-primary px-4 rounded-b-[10px] py-12 px-8 ">
        <div className="flex items-center gap-2">
          Withdraw <ArrowLongRightIcon className="w-4 h-4" /> Deposit APY /
          Projected Deposit APY
        </div>
        <FormatTwoPourcentage value={item.netAPY} value2={item.netAPY} />
      </div>
    </div>
  );
};

export default VaultWithdrawInput;
