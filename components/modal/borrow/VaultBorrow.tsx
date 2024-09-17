"use client";

import React, { useState } from "react";
import VaultBorrowPush from "./VaultBorrowPush";
import VaultBorrowInput from "./VaultBorrowInput";
import VaultBorrowSummary from "./VaultBorrowResult";
import { BorrowMarket } from "@/types";

interface Props {
  item: BorrowMarket;
  onlyBorrow?: boolean;
  closeModal: () => void;
  updateInfo: (marketId: string) => void;
}

const VaultBorrow: React.FC<Props> = ({
  item,
  onlyBorrow,
  closeModal,
  updateInfo,
}) => {
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
    updateInfo(item.id);
    closeModal();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VaultBorrowInput
            item={item}
            onlyBorrow={onlyBorrow}
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
            onlyBorrow={onlyBorrow}
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
