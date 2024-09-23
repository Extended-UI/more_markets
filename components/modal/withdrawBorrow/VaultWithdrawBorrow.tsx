"use client";

import React, { useState } from "react";
import VaultWithdrawConfirm from "./VaultWithdrawBorrowResult";
import VaultWithdrawBorrowPush from "./VaultWithdrawBorrowPush";
import VaultWithdrawBorrowInput from "./VaultWithdrawBorrowInput";
import { IBorrowPositionProp } from "@/types";

const VaultWithdraw: React.FC<IBorrowPositionProp> = ({
  item,
  closeModal,
  updateInfo,
}) => {
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

  return (
    <>
      {step == 1 ? (
        <VaultWithdrawBorrowInput
          item={item}
          closeModal={closeModal}
          setAmount={(amount: number) => handleSetWithdraw(amount)}
        />
      ) : step == 2 ? (
        <VaultWithdrawBorrowPush
          item={item}
          amount={amount}
          setTxHash={setTxHash}
          closeModal={closeModal}
          validWithdraw={handleValidWithdraw}
        />
      ) : (
        <VaultWithdrawConfirm
          item={item}
          amount={amount}
          txhash={txHash}
          processDone={handleProcessDone}
        />
      )}
    </>
  );
};

export default VaultWithdraw;
