"use client";

import { useAccount } from "wagmi";
import { type GetBalanceReturnType } from "@wagmi/core";
import React, { useState, useEffect } from "react";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import FormatPourcentage from "@/components/tools/formatPourcentage";
import { GraphMarket } from "@/types";
import { getTokenBallance } from "@/utils/contract";
import { getTokenInfo } from "@/utils/utils";

interface Props {
  item: GraphMarket;
  onlyBorrow?: boolean;
  closeModal: () => void;
  setAmount: (amount: number, borrow: number) => void;
}

const VaultBorrowInput: React.FC<Props> = ({
  item,
  onlyBorrow,
  setAmount,
  closeModal,
}) => {
  const [borrow, setBorrow] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [supplyBalance, setSupplyBalance] =
    useState<GetBalanceReturnType | null>(null);
  const [borrowBalance, setBorrowBalance] =
    useState<GetBalanceReturnType | null>(null);

  const { address: userAddress } = useAccount();

  const handleInputDepositChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeposit(parseFloat(event.target.value));
  };

  const handleInputBorrowChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBorrow(parseFloat(event.target.value));
  };

  const handleSetMaxToken = (maxValue: number) => {
    setDeposit(maxValue);
  };

  const handleSetMaxFlow = (maxValue: number) => {
    setBorrow(maxValue);
  };

  const handleBorrow = () => {
    setAmount(deposit, borrow);
  };

  useEffect(() => {
    const initBalances = async () => {
      setSupplyBalance(
        userAddress
          ? await getTokenBallance(item.inputToken.id, userAddress)
          : null
      );
      setBorrowBalance(
        userAddress
          ? await getTokenBallance(item.borrowedToken.id, userAddress)
          : null
      );
    };

    initBalances();
  }, [item, userAddress]);

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const borrowToken = getTokenInfo(item.borrowedToken.id).symbol;

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-2xl mb-10 px-4 pt-5 ">Borrow</div>
      <div className="text-l mb-1 px-4">
        Deposit {collateralToken} Collateral
      </div>
      {!onlyBorrow && (
        <>
          <div className=" py-2 px-4">
            <InputTokenMax
              type="number"
              value={deposit}
              onChange={handleInputDepositChange}
              min="0"
              max={"100"}
              placeholder={`Deposit ${collateralToken}`}
              token={item.inputToken.id}
              balance={supplyBalance ? Number(supplyBalance.formatted) : 0}
              setMax={handleSetMaxToken}
            />
          </div>
          <div className="text-right more-text-gray py-2 px-4">
            Balance: {supplyBalance ? Number(supplyBalance.formatted) : 0}{" "}
            {collateralToken}
          </div>
        </>
      )}
      <div className="text-l mb-1 px-4 py-2 mt-3">Borrow {borrowToken}</div>
      <div className=" px-4">
        <InputTokenMax
          type="number"
          value={borrow}
          onChange={handleInputBorrowChange}
          min="0"
          max={"100"}
          placeholder={`Deposit ${borrowToken}`}
          token={item.borrowedToken.id}
          balance={borrowBalance ? Number(borrowBalance.formatted) : 0}
          setMax={handleSetMaxFlow}
        />
      </div>
      <div className="text-right more-text-gray py-2 px-4">
        Balance: {borrowBalance ? Number(borrowBalance.formatted) : 0}{" "}
        {borrowToken}
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
        <div className="mr-5">
          <MoreButton
            className="text-2xl py-2"
            text="Borrow"
            onClick={() => handleBorrow()}
            color="gray"
          />
        </div>
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-secondary w-full"></div>
      </div>
      <div className="more-bg-primary px-4 rounded-b-[10px] py-2">
        <div className="flex justify-between mt-10">
          <div>1D Borrow APY:</div>
          <div className="">
            {"0"}
            <span className="more-text-gray">%</span>
          </div>
        </div>
        <div className="flex justify-between mt-10 pb-4 ">
          <div>Your Premium Liquidation LTV</div>
          <div className="">
            <FormatPourcentage value={0} />{" "}
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div>Available Liquidity</div>
          <div className="">
            {0} <span className="more-text-gray">{borrowToken}</span>{" "}
          </div>
        </div>
        <div className="flex justify-between mt-10 pb-4 ">
          <div>Your Credora Rating</div>
          <div className="">{0}</div>
        </div>
      </div>
    </div>
  );
};

export default VaultBorrowInput;
