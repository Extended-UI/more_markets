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
  closeModal: () => void;
}

const VaultDeposit: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, curator, closeModal }) => {

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSetDeposit = (amount: number) => {
    console.log("DEPOSIT SET", amount)    
    setAmount(amount);
    setStep(2);
  };


  const handleValidDeposit = () => {
    console.log("DEPOSIT VALID")
    setStep(3);
  };


  const handleProcessDone = () => {
    console.log("DEPOSIT DONE")
  };

  console.log("test", apy);
  

  const renderStep = () => {
    switch(step) {
      case 1:
        return <VaultDepositSet title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} setAmount={(amount: number) => handleSetDeposit(amount)}  closeModal={closeModal} />;
      case 2:
        return <VaultDepositConfirm title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} curator={curator} amount={amount}  validDeposit={() => handleValidDeposit()}  closeModal={closeModal} />;
      case 3:
        return <VaultDepositSummary amount={amount}  title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} processDone={() => handleProcessDone()} closeModal={closeModal}   />;
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
