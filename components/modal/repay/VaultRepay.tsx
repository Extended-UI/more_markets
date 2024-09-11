"use client";
import React, { useState } from "react";
import VaultRepaySet from "./VaultRepaySet";
import VaultRepayTransaction from "./VaultRepayTransaction";
import VaultRepayConfirm from "./VaultRepayConfirm";

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalRepay: number;
  totalTokenAmount: number;
  curator: string;
  closeModal: () => void;
}

const VaultRepay: React.FC<Props> = ({
  title,
  token,
  balance,
  apy,
  ltv,
  totalRepay,
  totalTokenAmount,
  curator,
  closeModal,
}) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSetRepay = (amount: number) => {
    console.log("DEPOSIT SET", amount);
    setAmount(amount);
    setStep(2);
  };

  const handleValidRepay = () => {
    console.log("DEPOSIT VALID");
    setStep(3);
  };

  const handleProcessDone = () => {
    console.log("DEPOSIT DONE");
  };

  console.log("test", apy);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VaultRepaySet
            title={title}
            token={token}
            balance={balance}
            apy={apy}
            ltv={ltv}
            totalRepay={totalRepay}
            totalTokenAmount={totalTokenAmount}
            setAmount={(amount: number) => handleSetRepay(amount)}
            closeModal={closeModal}
          />
        );
      case 2:
        return (
          <VaultRepayTransaction
            title={title}
            token={token}
            balance={balance}
            apy={apy}
            ltv={ltv}
            totalRepay={totalRepay}
            totalTokenAmount={totalTokenAmount}
            curator={curator}
            amount={amount}
            validRepay={() => handleValidRepay()}
            closeModal={closeModal}
          />
        );
      case 3:
        return (
          <VaultRepayConfirm
            amount={amount}
            title={title}
            token={token}
            balance={balance}
            apy={apy}
            ltv={ltv}
            totalRepay={totalRepay}
            totalTokenAmount={totalTokenAmount}
            processDone={() => handleProcessDone()}
            closeModal={closeModal}
          ></VaultRepayConfirm>
        );
      default:
        return null; // ou une vue par défaut
    }
  };

  return <div>{renderStep()}</div>;
};

export default VaultRepay;
