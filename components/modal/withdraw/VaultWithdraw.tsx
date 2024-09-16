"use client";

import React, { useState } from "react";
import VaultWithdrawInput from "./VaultWithdrawInput";
import VaultWithdrawPush from "./VaultWithdrawPush";
import VaultWithdrawResult from "./VaultWithdrawResult";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
  closeModal: () => void;
  updateInfo: (vaultId: string) => void;
}

const VaultWithdraw: React.FC<Props> = ({ item, closeModal, updateInfo }) => {
  const [step, setStep] = useState(1);
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
  };

  return (
    <>
      {step == 1 ? (
        <VaultWithdrawInput
          item={item}
          setAmount={(amount: number) => handleSetWithdraw(amount)}
          closeModal={closeModal}
        />
      ) : step == 2 ? (
        <VaultWithdrawPush
          item={item}
          amount={amount}
          setTxhash={setTxhash}
          closeModal={closeModal}
          validWithdraw={handleValidWithdraw}
        />
      ) : step == 3 ? (
        <VaultWithdrawResult
          item={item}
          hash={txhash}
          amount={amount}
          closeModal={closeModal}
          processDone={handleProcessDone}
        />
      ) : null}
    </>
  );
};

export default VaultWithdraw;
