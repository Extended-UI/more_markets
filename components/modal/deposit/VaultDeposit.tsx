"use client";

import React, { useState } from "react";
import VaultDepositInput from "./VaultDepositInput";
import VaultDepositPush from "./VaultDepositPush";
import VaultDepositResult from "./VaultDepositResult";
import { IInvestmentProp } from "@/types";

interface Props extends IInvestmentProp {
  closeModal: () => void;
}

const VaultDeposit: React.FC<Props> = ({ item, closeModal, updateInfo }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [useFlow, setUseFlow] = useState(true);

  const handleSetDeposit = (amount: string) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidDeposit = () => {
    setStep(3);
  };

  const handleProcessDone = () => {
    updateInfo(item.vaultId);
    closeModal();
  };

  return (
    <>
      {step == 1 ? (
        <VaultDepositInput
          item={item}
          closeModal={closeModal}
          useFlow={useFlow}
          setUseFlow={setUseFlow}
          setAmount={handleSetDeposit}
        />
      ) : step == 2 ? (
        <VaultDepositPush
          item={item}
          amount={amount}
          useFlow={useFlow}
          setTxHash={setTxHash}
          closeModal={closeModal}
          validDeposit={handleValidDeposit}
        />
      ) : step == 3 ? (
        <VaultDepositResult
          item={item}
          amount={amount}
          txhash={txHash}
          processDone={handleProcessDone}
        />
      ) : null}
    </>
  );
};

export default VaultDeposit;
