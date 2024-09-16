"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import { formatEther } from "ethers";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { getTokenInfo } from "@/utils/utils";
import { getTokenBallance } from "@/utils/contract";

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
    console.log("DEPOSIT");
    if (deposit > 0) {
      setAmount(deposit);
    }
  };

  const collateralToken = getTokenInfo(
    item.marketParams.collateralToken
  ).symbol;
  const loanToken = getTokenInfo(item.marketParams.loanToken).symbol;

  return (
    <div className="more-bg-secondary w-full pt-8 rounded-[20px]">
      <div className="text-2xl mb-10 px-4 pt-5 ">Withdraw collateral</div>
      <div className="flex items-center mb-10 px-8 gap-2">
        <ListIconToken iconNames={["usdc", "abt"]} className="w-7 h-7" />
        <div className="text-l   flex items-center'">
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
            token={collateralToken}
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
          onClick={() => handleWithdraw()}
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
            <span className="more-text-gray">n/a</span>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div>LTV / Liquidation LTV</div>
          <div>
            <span className="more-text-gray">
              {formatEther(item.marketParams.lltv)}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div>Collateral {collateralToken} </div>
          <div>
            <span className="more-text-gray">
              {formatEther(item.collateral)}
            </span>
          </div>
        </div>
        <div className="flex w-full justify-between ">
          <div>Loan {loanToken}</div>
          <div>
            <span className="more-text-gray">{formatEther(item.loan)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultWithdrawBorrowInput;
