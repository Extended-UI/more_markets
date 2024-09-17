"use client";

import React, { useState } from "react";
import VaultAddPush from "./VaultAddPush";
import VaultAddInput from "./VaultAddInput";
import VaultAddResult from "./VaultAddResult";
import { BorrowPosition } from "@/types";

interface Props {
  item: BorrowPosition;
  closeModal: () => void;
  updateInfo: (marketId: string) => void;
}

const VaultAdd: React.FC<Props> = ({ item, closeModal, updateInfo }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [txHash, setTxHash] = useState("");

  const handleSetAdd = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidAdd = () => {
    console.log("DEPOSIT VALID");
    setStep(3);
  };

  const handleProcessDone = () => {
    console.log("DEPOSIT DONE");
    updateInfo(item.id);
    closeModal();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VaultAddInput
            item={item}
            closeModal={closeModal}
            setAmount={(amount: number) => handleSetAdd(amount)}
          />
        );
      case 2:
        return (
          <VaultAddPush
            item={item}
            amount={amount}
            setTxHash={setTxHash}
            closeModal={closeModal}
            validAdd={handleValidAdd}
          />
        );
      case 3:
        return (
          <VaultAddResult
            item={item}
            txhash={txHash}
            amount={amount}
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

export default VaultAdd;
