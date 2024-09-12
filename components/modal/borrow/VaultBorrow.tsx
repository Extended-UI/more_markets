"use client";
import React, { useEffect, useState } from "react";
import VaultBorrowSet from "./VaultBorrowInput";
import VaultBorrowSummary from "./VaultBorrowResult";
import { GraphMarket } from "@/types";

interface Props {
  item: GraphMarket;
  closeModal: () => void;
}

const VaultBorrow: React.FC<Props> = ({ item, closeModal }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [borrow, setBorrow] = useState(0);

  // Réinitialiser l'étape quand le composant reçoit de nouvelles props, typiquement quand il est affiché
  useEffect(() => {
    // Réinitialisation de l'état quand la modale est fermée
    console.log("MOUNT");
    return () => {
      setStep(1); // Réinitialise l'étape à 1 quand le composant est démonté
    };
  }, []);

  const handleSetBorrow = (amount: number, borrow: number) => {
    console.log("BORROW SET");
    console.log(amount, borrow);
    setStep(2);
    setAmount(amount);
    setBorrow(borrow);
  };

  // likely useless
  const handleValidDeposit = () => {
    console.log("DEPOSIT VALID");
    setStep(3);
  };

  const handleProcessDone = () => {
    console.log("DEPOSIT DONE");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <VaultBorrowSet
            item={item}
            setAmount={(amount: number, borrow: number) =>
              handleSetBorrow(amount, borrow)
            }
            closeModal={closeModal}
          />
        );
      case 2:
        return (
          <VaultBorrowSummary
            item={item}
            amount={amount}
            borrow={borrow}
            processDone={() => handleProcessDone()}
            closeModal={closeModal}
          />
        );
      default:
        return null; // ou une vue par défaut
    }
  };

  return <div>{renderStep()}</div>;
};

export default VaultBorrow;
