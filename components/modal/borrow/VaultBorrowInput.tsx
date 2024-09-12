"use client";

import { ethers } from "ethers";
import {
  useAccount,
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import React, { useState } from "react";
import InputTokenMax from "../../input/InputTokenMax";
import MoreButton from "../../moreButton/MoreButton";
import FormatPourcentage from "@/components/tools/formatPourcentage";
import { GraphMarket } from "@/types";
import { ERC20Abi } from "@/app/abi/ERC20Abi";
import { contracts } from "@/utils/const";

interface Props {
  item: GraphMarket;
  closeModal: () => void;
  setAmount: (amount: number, borrow: number) => void;
}

const VaultBorrowInput: React.FC<Props> = ({ item, setAmount, closeModal }) => {
  const [deposit, setDeposit] = useState<number>(0);
  const [borrow, setBorrow] = useState<number>(0);
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const [txStep, setTxStep] = useState(1);
  const { address } = useAccount();

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
    if (deposit > 0 && borrow > 0) {
      setAmount(deposit, borrow);
    }
  };

  const handleCancel = () => {
    console.log("CANCEL");
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="more-bg-secondary w-full rounded-[20px]">
      <div className="text-2xl mb-10 px-4 pt-5 ">Borrow</div>
      <div className="text-l mb-1 px-4">
        Deposit {item.borrowedToken.id} Collateral
      </div>
      <div className=" py-2 px-4">
        <InputTokenMax
          type="number"
          value={deposit}
          onChange={handleInputDepositChange}
          min="0"
          max={"100"}
          placeholder={`Deposit ${item.inputToken.id}`}
          token={item.borrowedToken.id}
          balance={0}
          setMax={handleSetMaxToken}
        />
      </div>
      <div className="text-right more-text-gray py-2 px-4">
        Balance: {0} {item.borrowedToken.id}
      </div>
      <div className="text-l mb-1 px-4 py-2 mt-3">Borrow FLOW</div>
      <div className=" px-4">
        <InputTokenMax
          type="number"
          value={borrow}
          onChange={handleInputBorrowChange}
          min="0"
          max={"100"}
          placeholder={`Deposit ${item.borrowedToken.id}`}
          token="Flow"
          balance={0}
          setMax={handleSetMaxFlow}
        />
      </div>
      <div className="text-right more-text-gray py-2 px-4">
        Balance: {0} FLOW
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
        <button type="submit" className="text-2xl py-2" color="secondary">
          {txStep == 1
            ? isConfirming
              ? "Confirming..."
              : "Approve"
            : txStep == 2
            ? isConfirming
              ? "Confirming..."
              : "Deposit"
            : txStep == 3
            ? isConfirming
              ? "Confirming..."
              : "Borrow"
            : ""}
          {hash && <div>Transaction Hash: {hash}</div>}
        </button>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </div>
      <div className="w-[50%] mx-15 flex justify-center mx-auto">
        <div className="glowing-text-secondary w-full"></div>
      </div>
      <div className="more-bg-primary px-4 rounded-b-[10px] py-2">
        <div className="flex justify-between mt-10">
          <div>1D Borrow APY:</div>
          <div className="">
            {"apy"}
            <span className="more-text-gray">%</span>
          </div>
        </div>
        <div className="flex justify-between mt-10 pb-4 ">
          <div>Your Premium Liquidation LTV</div>
          <div className="">
            <FormatPourcentage value={0}></FormatPourcentage>{" "}
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div>Available Liquidity</div>
          <div className="">
            {0} <span className="more-text-gray">{item.borrowedToken.id}</span>{" "}
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
