"use client";

import React, { useState } from "react";
import MoreButton from "../../moreButton/MoreButton";
import InputTokenMax from "../../input/InputTokenMax";
import ListIconToken from "@/components/token/ListIconToken";
import FormatTwoPourcentage from "../../tools/formatTwoPourcentage";
import { BorrowPosition } from "@/types";
import { getTokenInfo, getPremiumLltv, formatTokenValue } from "@/utils/utils";

interface Props {
  item: BorrowPosition;
  closeModal: () => void;
  setAmount: (amount: number) => void;
}

const VaultWithdrawBorrowInput: React.FC<Props> = ({
  item,
  setAmount,
  closeModal,
}) => {
  const [deposit, setWithdraw] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdraw(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setWithdraw(maxValue);
  };

  const handleWithdraw = () => {
    if (deposit > 0) {
      setAmount(deposit);
    }
  };

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;
  const lltv2: number | null = getPremiumLltv(item.marketParams);
  const userCollateral = formatTokenValue(item.collateral, item.inputToken.id);

  return (
    <div className="more-bg-secondary w-full pt-8 rounded-[20px]">
      <div className="text-2xl mb-10 px-5 pt-5">Withdraw collateral</div>
      <div className="flex items-center mb-10 px-5 gap-2">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {" "}
          {collateralToken} / {loanToken}
        </div>
      </div>
      <div className="text-l mb-5 px-5">Withdraw {collateralToken}</div>
      <div className="w-full flex justify-center px-5">
        <InputTokenMax
          type="number"
          value={deposit}
          onChange={handleInputChange}
          placeholder={`Withdraw ${collateralToken}`}
          token={item.inputToken.id}
          balance={userCollateral}
          setMax={handleSetMax}
        />
      </div>
      <div className="text-right more-text-gray py-2 px-4">
        Available to Withdraw:{" "}
        {formatTokenValue(item.collateral, item.inputToken.id)}{" "}
        {collateralToken}
      </div>
      <div className="flex justify-end mt-7 mb-7 px-4">
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
          text="Confirm"
          onClick={handleWithdraw}
          color="primary"
        />
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary w-full"></div>
      </div>
      <div className="flex  w-full flex-col items-center justify-start more-bg-primary px-8 rounded-b-[10px] py-10 px-8 gap-4">
        <div className="flex w-full justify-between">
          <div>Borrow APY / Projected Borrow APY</div>
          <div>
            <span className="more-text-gray">N/A</span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>Liquidation LTV</div>
          <div>
            <span className="more-text-gray">
              <FormatTwoPourcentage
                value={formatTokenValue(item.lltv, "", 18)}
                value2={getPremiumLltv(item.marketParams)}
              />
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>Collateral {collateralToken} </div>
          <div>
            <span className="more-text-gray">
              {formatTokenValue(item.collateral, item.inputToken.id)}
            </span>
          </div>
        </div>
        {/* <div className="flex w-full justify-between">
          <div>Loan {loanToken}</div>
          <div>
            <span className="more-text-gray">
              {formatTokenValue(item.loan, item.borrowedToken.id)}
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default VaultWithdrawBorrowInput;
