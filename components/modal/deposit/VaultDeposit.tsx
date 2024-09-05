"use client";
import React, { useState } from "react";
import VaultDepositSet from "./VaultDepositSet";
import VaultDepositConfirm from "./VaultDepositConfirm";
import VaultDepositSummary from "./VaultDepositSummary";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
  closeModal: () => void;
}

const VaultDeposit: React.FC<Props> = ({ item, closeModal }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSetDeposit = (amount: number) => {
    console.log("DEPOSIT SET", amount);
    setAmount(amount);
    setStep(2);
  };

  const handleValidDeposit = () => {
    console.log("DEPOSIT VALID");
    setStep(3);
  };

  const handleProcessDone = () => {
    console.log("DEPOSIT DONE");
  };

  console.log("test", item.netAPY);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VaultDepositSet
            item={item}
            closeModal={closeModal}
            setAmount={(amount: number) => handleSetDeposit(amount)}
          />
        );
      case 2:
        return (
          <VaultDepositConfirm
            title={item.vaultName}
            token={item.tokenSymbol}
            balance={item.totalDeposits}
            apy={item.netAPY}
            ltv={"ltv"}
            totalDeposit={item.totalValueUSD}
            totalTokenAmount={item.totalDeposits}
            curator={item.curator}
            amount={amount}
            validDeposit={() => handleValidDeposit()}
            closeModal={closeModal}
          />
        );
      case 3:
        return (
          <VaultDepositSummary
            amount={amount}
            title={item.vaultName}
            token={item.tokenSymbol}
            balance={item.totalDeposits}
            apy={item.netAPY}
            ltv={"ltv"}
            totalDeposit={item.totalValueUSD}
            totalTokenAmount={item.totalDeposits}
            processDone={() => handleProcessDone()}
            closeModal={closeModal}
          />
        );
      default:
        return null; // ou une vue par défaut
    }
  };

  return <div>{renderStep()}</div>;
};

export default VaultDeposit;
