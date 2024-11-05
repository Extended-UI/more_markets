"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import ListIconToken from "@/components/token/ListIconToken";
import { IBorrowPosition } from "@/types";
import { initBalance } from "@/utils/const";
import { getTokenBallance } from "@/utils/contract";
import { getTokenInfo, validInputAmount } from "@/utils/utils";

interface Props extends IBorrowPosition {
  setAmount: (amount: string) => void;
}

const VaultAddInput: React.FC<Props> = ({ item, setAmount, closeModal }) => {
  const [deposit, setAdd] = useState("");
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType>(initBalance);

  const { address: userAddress } = useAccount();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdd(event.target.value);
  };

  const handleSetMax = (maxValue: string) => {
    setAdd(maxValue);
  };

  useEffect(() => {
    const initBalances = async () => {
      if (userAddress) {
        setSupplyBalance(
          await getTokenBallance(item.inputToken.id, userAddress)
        );
      }
    };

    initBalances();
  }, [item, userAddress]);

  const handleAdd = () => {
    if (validInputAmount(deposit)) setAmount(deposit);
  };

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;

  return (
    <div className="more-bg-secondary w-full rounded-[20px] modal-base relative">
      <div
        className="rounded-full bg-[#343434] hover:bg-[#3f3f3f] p-6 absolute right-4 top-4"
        onClick={closeModal}
      >
        <img
          src={"/assets/icons/close.svg"}
          alt="close"
          className="w-[12px] h-[12px]"
        />
      </div>
      <div className="px-[28px] pt-[50px] pb-[30px] text-[16px]">
        <div className="text-[24px] mb-[40px] font-semibold">
          Add Collateral
        </div>
        <div className="flex items-center mb-[30px] font-semibold text-[20px] gap-2">
          <ListIconToken
            iconNames={[item.inputToken.id, item.borrowedToken.id]}
            className="w-[24px] h-[24px] "
          />
          <div className="ml-3 flex items-center">
            {collateralToken} / {loanToken}
          </div>
        </div>
        <div className="text-[16px] mb-5">Add {collateralToken} Collateral</div>
        <div className="w-full flex flex-col justify-center">
          <div className="flex justify-center">
            <InputTokenMax
              type="number"
              value={deposit}
              onChange={handleInputChange}
              placeholder="0"
              token={item.inputToken.id}
              balance={supplyBalance.formatted}
              setMax={handleSetMax}
            />
          </div>
          <div className="text-right text-[16px] font-semibold more-text-gray px-4 mt-4">
            Balance: {supplyBalance?.formatted} {collateralToken}
          </div>
        </div>
      </div>
      <div className="flex justify-end more-bg-primary rounded-b-[20px] px-[28px] py-[30px]">
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
          text="Add Collateral"
          onClick={() => handleAdd()}
          color="primary"
        />
      </div>
    </div>
  );
};

export default VaultAddInput;
