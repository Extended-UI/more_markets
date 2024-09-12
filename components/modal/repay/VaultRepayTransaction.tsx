"use client";
import React, { useState } from "react";
import InputTokenMax from "../../input/InputTokenMax";
import TotalVolumeToken from "../../token/TotalVolumeToken";
import MoreButton from "../../moreButton/MoreButton";
import TokenAmount from "../../token/TokenAmount";
import PositionChangeToken from "@/components/token/PositionChangeToken";
import MoreToggle from "@/components/moreToggle/MoreToggle";
import FormatTwoPourcentage from "@/components/tools/formatTwoPourcentage";
import IconToken from "@/components/token/IconToken";
import ListIconToken from "@/components/token/ListIconToken";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
import FormatPourcentage from "@/components/tools/formatPourcentage";
import FormatPrice from "@/components/tools/formatPrice";

interface Props {
  title: string;
  token: string;
  curator: string;
  balance: number;
  apy: number;
  ltv: string;
  totalRepay: number;
  totalTokenAmount: number;
  amount: number;
  validRepay: () => void;
  closeModal: () => void;
}

const VaultRepayTransaction: React.FC<Props> = ({
  title,
  token,
  balance,
  apy,
  ltv,
  totalRepay,
  totalTokenAmount,
  curator,
  amount,
  validRepay,
  closeModal,
}) => {
  const [deposit, setRepay] = useState<number>(0);

  const handleRepay = () => {
    validRepay();
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
    <div className="more-bg-secondary rounded-[20px] h-full w-full px-8 py-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-10  pt-5  text-4xl">Review Transaction</div>
        <div className="flex items-center mb-10  gap-2">
          <ListIconToken iconNames={["usdc", "abt"]} className="w-7 h-7" />
          <div className="text-l   flex items-center'"> {token} / USDA</div>
        </div>

        <div className="more-bg-primary px-8 rounded-t-[5px] ">
          <TokenAmount
            title="Repay"
            token={token}
            amount={amount}
            ltv={ltv}
            totalTokenAmount={totalTokenAmount}
          />
          <div className="flex flex-row justify-between items-center h-20">
            <div className="text-xl">Projeted rate</div>
            <div className="flex  items-center gap-2">
              <FormatPourcentage value={apy} />{" "}
              <ArrowLongRightIcon className="w-4 h-4 text-grey" />{" "}
              <FormatPourcentage value={apy} />
            </div>
          </div>
        </div>

        <div className="more-bg-primary rounded-b-[5px] mt-[1px] px-8 flex flex-col gap-4 py-8">
          <div className="text-grey "> Position Change </div>
          <div className="flex flex-row justify-between items-center ">
            <div className="text-xl">Collateral</div>
            <div className="flex  items-center gap-2">
              <FormatPrice value={balance} token={token} />
            </div>
          </div>

          <PositionChangeToken
            title="Borrow"
            token={token}
            value={balance}
            value2={balance}
          />

          <div className="flex flex-row justify-between items-center ">
            <div className="text-xl">LTV / Liquidation LTV</div>
            <div className="flex  items-center gap-2">
              <FormatPourcentage value={apy} />{" "}
              <ArrowLongRightIcon className="w-4 h-4 text-grey" />{" "}
              <FormatTwoPourcentage value={apy} />
            </div>
          </div>

          <PositionChangeToken
            title="Collateral liq.price"
            token={token}
            value={balance}
            value2={balance}
          />
        </div>

        <div className="py-8 px-2">
          By confirming this transaction, you agree to the{" "}
          <a className="underline" href="#goto">
            Terms of Use
          </a>{" "}
        </div>
        <div className="flex justify-end py-5  rounded-b-[20px] px-4">
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
      </form>
    </div>
  );
};

export default VaultRepayTransaction;
