"use client";
import React, { useState } from "react";
import VaultAddSet from "./VaultAddSet";
import VaultAddTransaction from "./VaultAddTransaction";
import VaultAddConfirm from "./VaultAddConfirm";
import { MarketParams } from "@/types/marketParams";

interface Props {
    title: string;
    token: string;
    balance: number;
    apy: number;
    ltv: string;
    totalAdd: number;
    totalTokenAmount: number;
    curator: string;
    marketParams: MarketParams;
    closeModal: () => void;
}

const VaultAdd: React.FC<Props> = ({
    title,
    token,
    balance,
    apy,
    ltv,
    totalAdd,
    totalTokenAmount,
    curator,
    marketParams,
    closeModal,
}) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(0);

    const handleSetAdd = (amount: number) => {
        console.log("DEPOSIT SET", amount);
        setAmount(amount);
        setStep(2);
    };

    const handleValidAdd = () => {
        console.log("DEPOSIT VALID");
        setStep(3);
    };

    const handleProcessDone = () => {
        console.log("DEPOSIT DONE");
    };

    console.log("test", apy);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <VaultAddSet
                        title={title}
                        token={token}
                        balance={balance}
                        apy={apy}
                        ltv={ltv}
                        totalAdd={totalAdd}
                        totalTokenAmount={totalTokenAmount}
                        marketParams={marketParams}
                        setAmount={(amount: number) => handleSetAdd(amount)}
                        closeModal={closeModal}
                    />
                );
            case 2:
                return (
                    <VaultAddTransaction
                        title={title}
                        token={token}
                        balance={balance}
                        apy={apy}
                        ltv={ltv}
                        totalAdd={totalAdd}
                        totalTokenAmount={totalTokenAmount}
                        curator={curator}
                        amount={amount}
                        validAdd={() => handleValidAdd()}
                        closeModal={closeModal}
                    />
                );
            case 3:
                return (
                    <VaultAddConfirm
                        amount={amount}
                        title={title}
                        token={token}
                        balance={balance}
                        apy={apy}
                        ltv={ltv}
                        totalAdd={totalAdd}
                        totalTokenAmount={totalTokenAmount}
                        processDone={() => handleProcessDone()}
                        closeModal={closeModal}
                    ></VaultAddConfirm>
                );
            default:
                return null; // ou une vue par défaut
        }
    };

    return <div>{renderStep()}</div>;
};

export default VaultAdd;
