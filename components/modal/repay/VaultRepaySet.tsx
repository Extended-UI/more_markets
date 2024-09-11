"use client";
import React, { useState } from "react";
import InputTokenMax from "../../input/InputTokenMax";
import TotalVolumeToken from "../../token/TotalVolumeToken";
import MoreButton from "../../moreButton/MoreButton";
import FormatNumber from "../../tools/formatNumber";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import ListIconToken from "@/components/token/ListIconToken";

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalRepay: number;
  totalTokenAmount: number;
  setAmount: (amount: number) => void;
  closeModal: () => void;
}

const VaultRepaySet: React.FC<Props> = ({
  title,
  token,
  balance,
  apy,
  ltv,
  totalRepay,
  totalTokenAmount,
  setAmount,
  closeModal,
}) => {
  const [deposit, setRepay] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepay(parseFloat(event.target.value));
  };

  const handleSetMax = (maxValue: number) => {
    setRepay(maxValue);
  };

  const handleRepay = () => {
    console.log("DEPOSIT");
    if (deposit > 0) {
      setAmount(deposit);
    }
  };

  const handleCancel = () => {
    console.log("CANCEL");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("Submitting deposit:", deposit);
      // Simulate an API call
      // const response = await fetch('/api/deposit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, deposit }),
      // });
      // const data = await response.json();
      // console.log('Repay response:', data);
    } catch (error) {
      console.error("Error submitting deposit:", error);
    }
  };

  const balanceString = balance.toString();

  return (
    <div className="more-bg-secondary w-full  pt-8 rounded-[20px]">
      <form onSubmit={handleSubmit}>
        <div className="text-3xl mb-10 px-8  pt-10 ">{title}</div>
        <div className="flex items-center mb-10 px-8 gap-2">
          <ListIconToken iconNames={["usdc", "abt"]} className="w-7 h-7" />
          <div className="text-l   flex items-center'"> {token} / USDA</div>
        </div>
        <div className="w-full flex flex-col justify-center px-8 gap-4">
          <div className="text-l pl-2  flex items-center'"> Repay {token}</div>
          <div className="w-full flex justify-center">
            <InputTokenMax
              type="number"
              value={deposit}
              onChange={handleInputChange}
              min="0"
              max={balanceString}
              placeholder={`Repay ${token}`}
              token={token}
              balance={balance}
              setMax={handleSetMax}
            />
          </div>
          <div className="text-m text-grey pl-2  flex justify-end items-center'">
            Balance {balance} {token}
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
          <div className="flex w-full justify-between ">
            <div>Borrow APY / Projected Borrow APY</div>
            <div>
              <span className="more-text-gray">n/a</span>
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div>LTV / Liquidation LTV</div>
            <div>
              <span className="more-text-gray">n/a</span>
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div>Collateral {token} </div>
            <div>
              <span className="more-text-gray">n/a</span>
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div>Loan USDA</div>
            <div>
              <span className="more-text-gray">n/a</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VaultRepaySet;
