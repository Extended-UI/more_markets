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
  const [withdrawCollateral, setWithdrawCollateral] = useState<number>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal =
      event.target.value.length > 0
        ? parseFloat(event.target.value)
        : undefined;
    setWithdrawCollateral(inputVal);
  };

  const handleSetMax = (maxValue: number) => {
    setWithdrawCollateral(maxValue);
  };

  const handleWithdraw = () => {
    if (withdrawCollateral && withdrawCollateral > 0)
      setAmount(withdrawCollateral);
  };

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;
  const userCollateral = formatTokenValue(item.collateral, item.inputToken.id);

  return (
    <div className="more-bg-secondary w-full modal-base relative">
      <div className="rounded-full bg-[#343434] hover:bg-[#3f3f3f] p-6 absolute right-4 top-4" onClick={closeModal}>
        <img src={'assets/icons/close.svg'} alt="close" className="w-[12px] h-[12px]"/>
      </div>
      <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
        <div className="text-[24px] mb-[40px] font-semibold">
          Withdraw collateral
        </div>
        <div className="flex items-center mb-[30px] font-semibold text-[20px] gap-2">
          <ListIconToken
            iconNames={[item.inputToken.id, item.borrowedToken.id]}
            className="w-7 h-7"
          />
          <div className="ml-3 flex items-center">
            {collateralToken} / {loanToken}
          </div>
        </div>
        <div className="text-[16px] mb-5">Withdraw {collateralToken}</div>
        <div className="w-full flex justify-center">
          <InputTokenMax
            type="number"
            value={withdrawCollateral}
            onChange={handleInputChange}
            placeholder="0"
            token={item.inputToken.id}
            balance={userCollateral}
            setMax={handleSetMax}
          />
        </div>
        <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
          Available to Withdraw:
          {formatTokenValue(item.collateral, item.inputToken.id)}
          {collateralToken}
        </div>
        <div className="flex justify-end mt-[40px]">
          <div className="mr-5">
            <MoreButton
              className="text-2xl py-2"
              text="Cancel"
              onClick={closeModal}
              color="grey"
            />
          </div>
          <MoreButton
            className="text-2xl py-2"
            text="Confirm"
            onClick={handleWithdraw}
            color="primary"
          />
        </div>
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary !pb-0 w-full"></div>
      </div>
      <div className="more-bg-primary rounded-b-[20px] px-[28px] pb-[40px] pt-[30px] text-[16px] font-normal">
        <div className="flex w-full justify-between mb-[20px]">
          <div>Borrow APY / Projected Borrow APY</div>
          <div>
            <span className="more-text-gray font-medium">
              {(item.borrow_apr * 100).toFixed(2)} %
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between mb-[20px]">
          <div>Liquidation LTV</div>
          <div>
            <span className="more-text-gray font-medium">
              <FormatTwoPourcentage
                value={formatTokenValue(item.lltv, "", 18)}
                value2={getPremiumLltv(item.marketParams)}
              />
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between mb-[20px]">
          <div>Collateral ({collateralToken})</div>
          <div>
            <span className="more-text-gray font-medium">
              {formatTokenValue(item.collateral, item.inputToken.id).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>Loan ({loanToken})</div>
          <div>
            <span className="more-text-gray font-medium">
              {formatTokenValue(item.loan, item.borrowedToken.id).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultWithdrawBorrowInput;
