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
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [useMax, setUseMax] = useState(false);
  const [useFlow, setUseFlow] = useState(true);

  const handleSetRepay = (amount: string) => {
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

  return (
    <>
      {step == 1 ? (
        <VaultRepayInput
          item={item}
          useFlow={useFlow}
          setUseFlow={setUseFlow}
          setUseMax={setUseMax}
          closeModal={closeModal}
          setAmount={handleSetRepay}
        />
      ) : step == 2 ? (
        <VaultRepayPush
          item={item}
          useFlow={useFlow}
          amount={amount}
          useMax={useMax}
          setTxHash={setTxHash}
          closeModal={closeModal}
          validRepay={handleValidRepay}
        />
      ) : (
        <VaultRepayResult
          item={item}
          amount={amount}
          txhash={txHash}
          processDone={handleProcessDone}
        />
      )}
    </>
  );
};

export default VaultRepay;
