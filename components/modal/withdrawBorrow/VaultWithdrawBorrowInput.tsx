"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import MoreButton from "../../moreButton/MoreButton";
import InputTokenMax from "../../input/InputTokenMax";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { getTokenBallance } from "@/utils/contract";
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
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType | null>(null);

  const { address: userAddress } = useAccount();

  useEffect(() => {
    const initBalances = async () => {
      setSupplyBalance(
        userAddress
          ? await getTokenBallance(
              item.marketParams.collateralToken,
              userAddress
            )
          : null
      );
    };

    initBalances();
  }, [item, userAddress]);

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

  const collateralToken = getTokenInfo(
    item.marketParams.collateralToken
  ).symbol;
  const loanToken = getTokenInfo(item.marketParams.loanToken).symbol;
  const lltv2: number | null = getPremiumLltv(item.marketParams);

  return (
    <div className="more-bg-secondary w-full pt-8 rounded-[20px]">
      <div className="text-2xl mb-10 px-4 pt-5 ">Withdraw collateral</div>
      <div className="flex items-center mb-10 px-8 gap-2">
        <ListIconToken
          iconNames={[
            item.marketParams.collateralToken,
            item.marketParams.loanToken,
          ]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {" "}
          {collateralToken} / {loanToken}
        </div>
      </div>
      <div className="text-l mb-5 px-4">Withdraw {collateralToken}</div>
      <div className="w-full flex justify-center">
        <div className="w-[95%] flex justify-center">
          <InputTokenMax
            type="number"
            value={deposit}
            onChange={handleInputChange}
            placeholder={`Withdraw ${collateralToken}`}
            token={item.marketParams.collateralToken}
            balance={Number(supplyBalance ? supplyBalance.formatted : 0)}
            setMax={handleSetMax}
          />
        </div>
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
      <div className="flex  w-full flex-col items-center justify-start more-bg-primary px-8 rounded-b-[10px] py-10 px-8 gap-4 ">
        <div className="flex w-full justify-between ">
          <div>Borrow APY / Projected Borrow APY</div>
          <div>
            <span className="more-text-gray">N/A</span>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div>LTV / Liquidation LTV</div>
          <div>
            <span className="more-text-gray">
              {formatTokenValue(item.marketParams.lltv, "", 18)}%
              {lltv2 ? " / " + lltv2.toFixed(2) + "%" : ""}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div>Collateral {collateralToken} </div>
          <div>
            <span className="more-text-gray">
              {formatTokenValue(
                item.collateral,
                item.marketParams.collateralToken
              )}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>Loan {loanToken}</div>
          <div>
            <span className="more-text-gray">
              {formatTokenValue(item.loan, item.marketParams.loanToken)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultWithdrawBorrowInput;
