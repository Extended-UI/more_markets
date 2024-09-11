"use client";

import React, { useState } from "react";
import VaultDepositInput from "./VaultDepositInput";
import VaultDepositPush from "./VaultDepositPush";
import VaultDepositResult from "./VaultDepositResult";
import { InvestmentData } from "@/types";

interface Props {
  item: InvestmentData;
  closeModal: () => void;
}

const VaultDeposit: React.FC<Props> = ({ item, closeModal }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [txhash, setTxhash] = useState("");

  const handleSetDeposit = (amount: number) => {
    setAmount(amount);
    setStep(2);
  };

  const handleValidDeposit = () => {
    setStep(3);
  };

  const handleProcessDone = () => {
    closeModal();
  };

  return (
    <>
      {step == 1 ? (
        <VaultDepositInput
          item={item}
          closeModal={closeModal}
          setAmount={(amount: number) => handleSetDeposit(amount)}
        />
      ) : step == 2 ? (
        <VaultDepositPush
          item={item}
          amount={amount}
          setTxhash={setTxhash}
          closeModal={closeModal}
          validDeposit={() => handleValidDeposit()}
        />
      ) : step == 3 ? (
        <VaultDepositResult
          amount={amount}
          item={item}
          hash={txhash}
          processDone={() => handleProcessDone()}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

export default VaultDeposit;
