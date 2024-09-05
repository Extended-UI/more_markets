"use client";

import React, { useState } from "react";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import FormatTokenMillion from "@/components/tools/formatTokenMillion";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
  closeModal: () => void;
  setAmount: (amount: number) => void;
}

const VaultDepositSet: React.FC<Props> = ({ item, setAmount, closeModal }) => {
  const [deposit, setDeposit] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setDeposit(maxValue);
  };

  const handleDeposit = () => {
    if (deposit > 0) {
      setAmount(deposit);
    }
  };

  const balanceString = item.tokenBalance.formatted;

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-4xl mb-10 px-4 pt-10 ">{item.vaultName}</div>
      <div className="text-l mb-5 px-4">Deposit {item.tokenSymbol}</div>
      <div className="px-4">
        <InputTokenMax
          type="number"
          value={deposit}
          onChange={handleInputChange}
          min="0"
          max={balanceString}
          placeholder={`Deposit ${item.tokenSymbol}`}
          token={item.tokenSymbol}
          balance={Number(balanceString)}
          setMax={handleSetMax}
        />
      </div>
      <div className="text-right more-text-gray px-4 mt-4">
        Balance: {balanceString} {item.tokenSymbol}
      </div>
      <div className="flex justify-end mt-7 mb-7 px-4">
        <div className="mr-5 ">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        <MoreButton
          className="text-2xl py-2"
          text="Deposit"
          onClick={() => handleDeposit()}
          color="primary"
        />
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary w-full"></div>
      </div>
      <div className="more-bg-primary px-4 rounded-b-[10px] py-2">
        <div className="flex justify-between mt-10">
          <div>APY:</div>
          <div>
            {item.netAPY}
            <span className="more-text-gray">%</span>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div>Total Deposits</div>
          <div>
            <FormatTokenMillion
              value={item.totalDeposits}
              totalValue={item.totalValueUSD}
              token={item.tokenSymbol}
            ></FormatTokenMillion>
          </div>
        </div>
        <div className="flex justify-between mt-10 pb-4 ">
          <div>Liquidation LTV</div>
          <div className="text-primary">{"ltv"}</div>
        </div>
      </div>
    </div>
  );
};

export default VaultDepositSet;
