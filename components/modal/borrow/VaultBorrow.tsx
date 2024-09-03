"use client";
import React, { useEffect, useState } from "react";
import VaultBorrowSet from "./VaultBorrowSet";
import VaultBorrowSummary from "./VaultBorrowSummary";
import { MarketParams } from "@/types/marketParams";

interface Props {
    title: string;
    token: string;
    balanceToken: number;
    balanceFlow: number;
    apy: number;
    ltv: string;
    totalDeposit: number;
    totalTokenAmount: number;
    curator: string;
    credora: string;
    marketParams: MarketParams;
    closeModal: () => void;
}

const VaultBorrow: React.FC<Props> = ({
    title,
    token,
    balanceToken,
    balanceFlow,
    apy,
    ltv,
    totalDeposit,
    totalTokenAmount,
    curator,
    marketParams,
    credora,
    closeModal,
}) => {
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
                        credora={credora}
                        title={title}
                        token={token}
                        balanceToken={balanceToken}
                        balanceFlow={balanceFlow}
                        apy={apy}
                        ltv={ltv}
                        totalDeposit={totalDeposit}
                        totalTokenAmount={totalTokenAmount}
                        marketParams={marketParams}
                        setAmount={(amount: number, borrow: number) =>
                            handleSetBorrow(amount, borrow)
                        }
                        closeModal={closeModal}
                    />
                );
            case 2:
                return (
                    <VaultBorrowSummary
                        amount={amount}
                        borrow={borrow}
                        title={title}
                        token={token}
                        balance={balanceToken}
                        apy={apy}
                        ltv={ltv}
                        totalDeposit={totalDeposit}
                        totalTokenAmount={totalTokenAmount}
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
