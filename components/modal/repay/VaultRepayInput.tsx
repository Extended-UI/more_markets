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

const VaultRepayInput: React.FC<Props> = ({ item, setAmount, closeModal }) => {
  const { address: userAddress } = useAccount();

  const [deposit, setRepay] = useState<number>(0);
  const [loanBalance, setLoanBalance] = useState<GetBalanceReturnType | null>(
    null
  );

  useEffect(() => {
    const initBalances = async () => {
      setLoanBalance(
        userAddress
          ? await getTokenBallance(item.marketParams.loanToken, userAddress)
          : null
      );
    };

    initBalances();
  }, [item, userAddress]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.length > 0 ? event.target.value : "0";
    setRepay(parseFloat(inputValue));
  };

  const handleSetMax = (maxValue: number) => {
    setRepay(maxValue);
  };

  const handleRepay = () => {
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
    <div className="more-bg-secondary w-full  pt-8 rounded-[20px]">
      <div className="text-3xl mb-10 px-8  pt-10 ">Repay loan</div>
      <div className="flex items-center mb-10 px-8 gap-2">
        <ListIconToken
          iconNames={[
            item.marketParams.collateralToken,
            item.marketParams.loanToken,
          ]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {collateralToken} / {loanToken}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center px-8 gap-4">
        <div className="text-l pl-2  flex items-center'">Repay {loanToken}</div>
        <div className="w-full flex justify-center">
          <InputTokenMax
            type="number"
            value={deposit}
            onChange={handleInputChange}
            placeholder={`Repay ${loanToken}`}
            token={item.marketParams.loanToken}
            balance={Number(loanBalance ? loanBalance.formatted : 0)}
            setMax={handleSetMax}
          />
        </div>
        <div className="text-right more-text-gray px-4 mt-4">
          Balance: {loanBalance?.formatted} {loanToken}
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
        <div className="glowing-text-primary w-full"></div>
      </div>
      <div className="flex text-xl  w-full flex-col items-center justify-start more-bg-primary px-8 rounded-b-[10px] py-10 px-8 gap-4 ">
        <div className="flex w-full justify-between">
          <div>Borrow APY / Projected Borrow APY</div>
          <div>
            <span className="more-text-gray">N/A</span>
          </div>
        </div>
        <div className="flex w-full justify-between ">
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
        <div className="flex w-full justify-between ">
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

export default VaultRepayInput;