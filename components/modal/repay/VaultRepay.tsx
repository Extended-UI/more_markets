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
  const [useMax, setUseMax] = useState(false);

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

  return (
    <>
      {step == 1 ? (
        <VaultRepayInput
          item={item}
          setUseMax={setUseMax}
          closeModal={closeModal}
          setAmount={(amount: number) => handleSetRepay(amount)}
        />
      ) : step == 2 ? (
        <VaultRepayPush
          item={item}
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
