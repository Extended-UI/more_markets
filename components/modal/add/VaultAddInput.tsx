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
  const [deposit, setAdd] = useState<number>(0);
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType | null>(null);

  const { address: userAddress } = useAccount();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdd(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setAdd(maxValue);
  };

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

  const handleAdd = () => {
    setAmount(deposit);
  };

  const collateralToken = getTokenInfo(
    item.marketParams.collateralToken
  ).symbol;
  const loanToken = getTokenInfo(item.marketParams.loanToken).symbol;

  return (
    <div className="more-bg-secondary w-full pt-8 rounded-[20px]">
      <div className="text-2xl mb-10 px-4 pt-5 ">Add Collateral</div>
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
      <div className="text-l mb-5 px-4">
        Deposit {collateralToken} Collateral
      </div>

      <div className="w-full flex flex-col justify-center mt-10">
        <div className="mx-4 flex justify-center">
          <InputTokenMax
            type="number"
            value={deposit}
            onChange={handleInputChange}
            min="0"
            placeholder={`Add ${collateralToken}`}
            token={collateralToken}
            balance={Number(supplyBalance ? supplyBalance.formatted : 0)}
            setMax={handleSetMax}
          />
        </div>
        <div className="text-right more-text-gray px-4 mt-4">
          Balance: {supplyBalance?.formatted} {collateralToken}
        </div>
      </div>
      <div className="flex justify-end mt-7 mb-7 px-4 pb-5">
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Cancel"
            onClick={closeModal}
            color="gray"
          />
        </div>
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Confirm"
            onClick={() => handleAdd()}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default VaultAddInput;
