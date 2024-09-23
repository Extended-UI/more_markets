"use client";

import React, { useState } from "react";
import VaultAddPush from "./VaultAddPush";
import VaultAddInput from "./VaultAddInput";
import VaultAddResult from "./VaultAddResult";
import { IBorrowPositionProp } from "@/types";

const VaultAdd: React.FC<IBorrowPositionProp> = ({
  item,
  closeModal,
  updateInfo,
}) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [txHash, setTxHash] = useState("");

  const handleSetAdd = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidAdd = () => {
    setStep(3);
  };

  const handleProcessDone = () => {
    updateInfo(item.id);
    closeModal();
  };

  return (
    <>
      {step == 1 ? (
        <VaultAddInput
          item={item}
          closeModal={closeModal}
          setAmount={(amount: number) => handleSetAdd(amount)}
        />
      ) : step == 2 ? (
        <VaultAddPush
          item={item}
          amount={amount}
          setTxHash={setTxHash}
          closeModal={closeModal}
          validAdd={handleValidAdd}
        />
      ) : (
        <VaultAddResult
          item={item}
          txhash={txHash}
          amount={amount}
          closeModal={closeModal}
          processDone={handleProcessDone}
        />
      )}
    </>
  );
};

export default VaultAdd;
