"use client";

import React, { useState } from "react";
import VaultWithdrawInput from "./VaultWithdrawInput";
import VaultWithdrawPush from "./VaultWithdrawPush";
import VaultWithdrawResult from "./VaultWithdrawResult";
import { IInvestmentProp } from "@/types";

interface Props extends IInvestmentProp {
  closeModal: () => void;
}

const VaultWithdraw: React.FC<Props> = ({ item, closeModal, updateInfo }) => {
  const [step, setStep] = useState(1);
  const [useMax, setUseMax] = useState(false);
  const [amount, setAmount] = useState(0);
  const [txhash, setTxhash] = useState("");

  const handleSetWithdraw = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidWithdraw = () => {
    setStep(3);
  };

  const handleProcessDone = () => {
    updateInfo(item.vaultId);
    closeModal();
  };

  return (
    <>
      {step == 1 ? (
        <VaultWithdrawInput
          item={item}
          useMax={useMax}
          setUseMax={setUseMax}
          closeModal={closeModal}
          setAmount={handleSetWithdraw}
        />
      ) : step == 2 ? (
        <VaultWithdrawPush
          item={item}
          useMax={useMax}
          amount={amount}
          setTxhash={setTxhash}
          closeModal={closeModal}
          validWithdraw={handleValidWithdraw}
        />
      ) : step == 3 ? (
        <VaultWithdrawResult
          item={item}
          txhash={txhash}
          amount={amount}
          processDone={handleProcessDone}
        />
      ) : null}
    </>
  );
};

export default VaultWithdraw;
