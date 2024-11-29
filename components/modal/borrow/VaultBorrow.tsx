"use client";

import React, { useState } from "react";
import VaultBorrowPush from "./VaultBorrowPush";
import VaultBorrowInput from "./VaultBorrowInput";
import VaultBorrowSummary from "./VaultBorrowResult";
import { IBorrowPositionProp } from "@/types";

interface Props extends IBorrowPositionProp {
  onlyBorrow?: boolean;
}

const VaultBorrow: React.FC<Props> = ({
  item,
  onlyBorrow,
  closeModal,
  updateInfo,
}) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [borrow, setBorrow] = useState("");
  const [txHash, setTxHash] = useState("");
  const [useFlow, setUseFlow] = useState(true);

  const handleSetBorrow = (amount: string, borrow: string) => {
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

  return (
    <>
      {step == 1 ? (
        <VaultBorrowInput
          item={item}
          useFlow={useFlow}
          setUseFlow={setUseFlow}
          onlyBorrow={onlyBorrow}
          closeModal={closeModal}
          setAmount={handleSetBorrow}
        />
      ) : step == 2 ? (
        <VaultBorrowPush
          item={item}
          useFlow={useFlow}
          onlyBorrow={onlyBorrow}
          supplyAmount={amount}
          borrowAmount={borrow}
          setTxHash={setTxHash}
          validDeposit={handleValidDeposit}
          closeModal={closeModal}
        />
      ) : (
        <VaultBorrowSummary
          item={item}
          amount={""}
          supplyAmount={amount}
          borrowAmount={borrow}
          txhash={txHash}
          onlyBorrow={onlyBorrow}
          processDone={handleProcessDone}
        />
      )}
    </>
  );
};

export default VaultBorrow;
