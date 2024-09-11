"use client";

import React, { useState } from "react";
import VaultWithdrawInput from "./VaultWithdrawInput";
import VaultWithdrawResult from "./VaultWithdrawPush";
import VaultWithdrawPush from "./VaultWithdrawResult";

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalWithdraw: number;
  totalTokenAmount: number;
  curator: string;
  closeModal: () => void;
}

const VaultWithdraw: React.FC<Props> = ({
  title,
  token,
  balance,
  apy,
  ltv,
  totalWithdraw,
  totalTokenAmount,
  curator,
  closeModal,
}) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [txhash, setTxhash] = useState("");

  const handleSetWithdraw = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidWithdraw = () => {
    console.log("withdraw VALID");
    setStep(3);
  };

  const handleProcessDone = () => {
    console.log("withdraw DONE");
  };

  return (
    <>
      {step == 1 ? (
        <VaultWithdrawInput
          title={title}
          token={token}
          balance={balance}
          apy={apy}
          ltv={ltv}
          totalWithdraw={totalWithdraw}
          totalTokenAmount={totalTokenAmount}
          setAmount={(amount: number) => handleSetWithdraw(amount)}
          closeModal={closeModal}
        />
      ) : step == 2 ? (
        <VaultWithdrawPush
          amount={amount}
          title={title}
          token={token}
          balance={balance}
          apy={apy}
          ltv={ltv}
          totalWithdraw={totalWithdraw}
          totalTokenAmount={totalTokenAmount}
          processDone={() => handleProcessDone()}
          closeModal={closeModal}
        />
      ) : step == 3 ? (
        <VaultWithdrawResult
          title={title}
          token={token}
          balance={balance}
          apy={apy}
          ltv={ltv}
          totalWithdraw={totalWithdraw}
          totalTokenAmount={totalTokenAmount}
          curator={curator}
          amount={amount}
          validWithdraw={() => handleValidWithdraw()}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

export default VaultWithdraw;
