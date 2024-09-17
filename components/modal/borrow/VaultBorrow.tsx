"use client";

import React, { useState } from "react";
import { BorrowMarket } from "@/types";

import VaultBorrowPush from "./VaultBorrowPush";
import VaultBorrowInput from "./VaultBorrowInput";
import VaultBorrowSummary from "./VaultBorrowResult";

interface Props {
  item: BorrowMarket;
  closeModal: () => void;
}

const VaultBorrow: React.FC<Props> = ({ item, closeModal }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [borrow, setBorrow] = useState(0);
  const [txHash, setTxHash] = useState("");

  const handleSetBorrow = (amount: number, borrow: number) => {
    setStep(2);
    setAmount(amount);
    setBorrow(borrow);
  };

  // likely useless
  const handleValidDeposit = () => {
    setStep(3);
  };

  const handleProcessDone = () => {
    closeModal();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VaultBorrowInput
            item={item}
            setAmount={(amount: number, borrow: number) =>
              handleSetBorrow(amount, borrow)
            }
            closeModal={closeModal}
          />
        );
      case 2:
        return (
          <VaultBorrowPush
            item={item}
            supplyAmount={amount}
            borrowAmount={borrow}
            setTxHash={setTxHash}
            validDeposit={handleValidDeposit}
            closeModal={closeModal}
          />
        );
      case 3:
        return (
          <VaultBorrowSummary
            item={item}
            supplyAmount={amount}
            borrowAmount={borrow}
            txhash={txHash}
            processDone={handleProcessDone}
          />
        );
      default:
        return null; // ou une vue par défaut
    }
  };

  return <div>{renderStep()}</div>;
};

export default VaultBorrow;
