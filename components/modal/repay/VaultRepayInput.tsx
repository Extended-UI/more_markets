"use client";

import { useAccount } from "wagmi";
import { formatUnits } from "ethers";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import MoreButton from "../../moreButton/MoreButton";
import InputTokenMax from "../../input/InputTokenMax";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition } from "@/types";
import { getTokenBallance } from "@/utils/contract";
import { getTokenInfo, getPremiumLltv, formatTokenValue } from "@/utils/utils";

interface Props {
  useMax: boolean;
  item: BorrowPosition;
  closeModal: () => void;
  setAmount: (amount: number) => void;
  setUseMax: (useMax: boolean) => void;
}

const VaultRepayInput: React.FC<Props> = ({
  item,
  useMax,
  setUseMax,
  setAmount,
  closeModal,
}) => {
  const { address: userAddress } = useAccount();

  const [repayAmount, setRepayAmount] = useState<number>();
  const [loanBalance, setLoanBalance] = useState<GetBalanceReturnType | null>(
    null
  );

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id);
  const lltv2: number | null = getPremiumLltv(item.marketParams);

  useEffect(() => {
    const initBalances = async () => {
      setLoanBalance(
        userAddress
          ? await getTokenBallance(item.borrowedToken.id, userAddress)
          : null
      );
    };

    initBalances();
  }, [item, userAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal =
      event.target.value.length > 0
        ? parseFloat(event.target.value)
        : undefined;
    setRepayAmount(inputVal);
    setUseMax(false);
  };

  const handleSetMax = (maxValue: number) => {
    if (loanBalance) {
      const maxAmount =
        loanBalance.value >= item.loan ? item.loan : loanBalance.value;
      setRepayAmount(Number(formatUnits(maxAmount, loanToken.decimals)));
      setUseMax(true);
    }
  };

  const handleRepay = () => {
    if (repayAmount && repayAmount) setAmount(repayAmount);
  };

  return (
    <div className="more-bg-secondary w-full pt-8 rounded-[20px]">
      <div className="text-3xl mb-10 px-5 pt-10">Repay Loan</div>
      <div className="flex items-center mb-10 px-5 gap-2">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {collateralToken} / {loanToken.symbol}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center px-5 gap-4">
        <div className="text-l pl-2 flex items-center'">
          Repay {loanToken.symbol}
        </div>
        <InputTokenMax
          type="number"
          value={repayAmount}
          onChange={handleInputChange}
          placeholder="0"
          token={item.borrowedToken.id}
          balance={Number(loanBalance ? loanBalance.formatted : 0)}
          setMax={handleSetMax}
        />
        <div className="text-right more-text-gray">
          Balance: {loanBalance?.formatted} {loanToken.symbol}
        </div>
      </div>
      <div className="flex justify-end mt-7 mb-7 px-8">
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
          onClick={() => handleRepay()}
          color="primary"
        />
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-primary w-full" />
      </div>
      <div className="flex text-xl w-full flex-col items-center justify-start more-bg-primary px-8 rounded-b-[10px] py-10 px-8 gap-4">
        <div className="flex w-full justify-between">
          <div>Borrow APY / Projected Borrow APY</div>
          <div>
            <span className="more-text-gray">N/A</span>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div>LTV / Liquidation LTV</div>
          <div>
            <span className="more-text-gray">
              {(formatTokenValue(item.marketParams.lltv, "", 18) * 100).toFixed(
                2
              )}
              %{lltv2 ? " / " + lltv2.toFixed(2) + "%" : ""}
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
        <div className="flex w-full justify-between">
          <div>Loan {loanToken.symbol}</div>
          <div>
            <span className="more-text-gray">
              {formatTokenValue(item.loan, item.borrowedToken.id)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultRepayInput;
