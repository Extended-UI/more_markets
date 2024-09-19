"use client";

import React, { useState } from "react";
import VaultRepayPush from "./VaultRepayPush";
import VaultRepayInput from "./VaultRepayInput";
import VaultRepayResult from "./VaultRepayResult";
import { IBorrowPositionProp } from "@/types";

const VaultRepay: React.FC<IBorrowPositionProp> = ({
  item,
  closeModal,
  updateInfo,
}) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [txHash, setTxHash] = useState("");

  const handleSetRepay = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidRepay = () => {
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
          <VaultRepayInput
            item={item}
            closeModal={closeModal}
            setAmount={(amount: number) => handleSetRepay(amount)}
          />
        );
      case 2:
        return (
          <VaultRepayPush
            item={item}
            amount={amount}
            setTxHash={setTxHash}
            closeModal={closeModal}
            validRepay={handleValidRepay}
          />
        );
      case 3:
        return (
          <VaultRepayResult
            item={item}
            amount={amount}
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

export default VaultRepay;
