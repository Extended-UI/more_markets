"use client";

import React, { useState } from "react";
import VaultWithdrawConfirm from "./VaultWithdrawBorrowResult";
import VaultWithdrawBorrowPush from "./VaultWithdrawBorrowPush";
import VaultWithdrawBorrowInput from "./VaultWithdrawBorrowInput";
import { BorrowPosition } from "@/types";

interface Props {
  item: BorrowPosition;
  closeModal: () => void;
  updateInfo: (marketId: string) => void;
}

const VaultWithdraw: React.FC<Props> = ({ item, closeModal, updateInfo }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [txHash, setTxHash] = useState("");

  const handleSetWithdraw = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidWithdraw = () => {
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
          <VaultWithdrawBorrowInput
            item={item}
            closeModal={closeModal}
            setAmount={(amount: number) => handleSetWithdraw(amount)}
          />
        );
      case 2:
        return (
          <VaultWithdrawBorrowPush
            item={item}
            amount={amount}
            setTxHash={setTxHash}
            closeModal={closeModal}
            validWithdraw={handleValidWithdraw}
          />
        );
      case 3:
        return (
          <VaultWithdrawConfirm
            item={item}
            amount={amount}
            txhash={txHash}
            closeModal={closeModal}
            processDone={handleProcessDone}
          />
        );
      default:
        return null; // ou une vue par défaut
    }
  };

  return <div>{renderStep()}</div>;
};

export default VaultWithdraw;
