"use client";
import React, { useState } from 'react';
import VaultDepositSet from './VaultDepositSet';
import VaultDepositConfirm from './VaultDepositConfirm';
import VaultDepositSummary from './VaultDepositSummary';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  curator: string;
}

const VaultDeposit: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, curator }) => {

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleDeposit = () => {
    console.log("DEPOSIT DONE")
    setStep(2);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return <VaultDepositSet title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} setAmount={(amount: number) => handleDeposit()} />;
      case 2:
        return <VaultDepositConfirm title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} curator={curator} amount={amount}/>;
      case 3:
        return <VaultDepositSummary title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} />;
      default:
        return null; // ou une vue par défaut
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
};

export default VaultDeposit;
