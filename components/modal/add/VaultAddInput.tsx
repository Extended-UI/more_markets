"use client";

import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { type GetBalanceReturnType } from "@wagmi/core";
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

const VaultAddInput: React.FC<Props> = ({ item, setAmount, closeModal }) => {
  const [deposit, setAdd] = useState<number>();
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType | null>(null);

  const { address: userAddress } = useAccount();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal =
      event.target.value.length > 0
        ? parseFloat(event.target.value)
        : undefined;
    setAdd(inputVal);
  };

  const handleSetMax = (maxValue: number) => {
    setAdd(maxValue);
  };

  useEffect(() => {
    const initBalances = async () => {
      setSupplyBalance(
        userAddress
          ? await getTokenBallance(item.inputToken.id, userAddress)
          : null
      );
    };

    initBalances();
  }, [item, userAddress]);

  const handleAdd = () => {
    if (deposit && deposit > 0) setAmount(deposit);
  };

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const loanToken = getTokenInfo(item.borrowedToken.id).symbol;

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-4xl mb-10 px-4 pt-10">Add Collateral</div>
      <div className="flex items-center mb-5 px-4 gap-2">
        <ListIconToken
          iconNames={[item.inputToken.id, item.borrowedToken.id]}
          className="w-7 h-7"
        />
        <div className="text-l flex items-center'">
          {collateralToken} / {loanToken}
        </div>
      </div>
      <div className="text-l mb-5 px-4">Add {collateralToken} Collateral</div>

      <div className="w-full flex flex-col justify-center mt-5">
        <div className="mx-4 flex justify-center">
          <InputTokenMax
            type="number"
            value={deposit}
            onChange={handleInputChange}
            placeholder="0"
            token={item.inputToken.id}
            balance={Number(supplyBalance ? supplyBalance.formatted : 0)}
            setMax={handleSetMax}
          />
        </div>
        <div className="text-right more-text-gray px-4 mt-4">
          Balance: {supplyBalance?.formatted} {collateralToken}
        </div>
      </div>
      <div className="flex justify-end mt-5 px-4 py-5 gap-3 more-bg-primary rounded-b-[20px]">
        <MoreButton
          className="text-2xl py-2"
          text="Cancel"
          onClick={closeModal}
          color="gray"
        />
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
