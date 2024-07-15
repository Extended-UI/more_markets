"use client";
import React, { useState } from 'react';
import VaultBorrowSet from './VaultBorrowSet';


interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalDeposit: number;
  totalTokenAmount: number;
  curator: string;
  credora: string;
}

const VaultBorrow: React.FC<Props> = ({ title, token, balance, apy, ltv, totalDeposit, totalTokenAmount, curator, credora }) => {

  console.log('STEP 1')

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSetDeposit = () => {
    console.log("DEPOSIT SET")
    setStep(2);
  };


  const handleValidDeposit = () => {
    console.log("DEPOSIT VALID")
    setStep(3);
  };


  const handleProcessDone = () => {
    console.log("DEPOSIT DONE")
  };

  console.log('STEP 2')

  const renderStep = () => {
    console.log('STEP 3')
    switch(step) {
      case 1:
        return <VaultBorrowSet credora={credora} title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} setAmount={(amount: number) => handleSetDeposit()} />;
      // case 2:
      //   return <VaultBorrowConfirm title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} curator={curator} amount={amount}  validDeposit={() => handleValidDeposit()} />;
      // case 3:
      //   return <VaultBorrowSummary title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalDeposit={totalDeposit} totalTokenAmount={totalTokenAmount} processDone={() => handleProcessDone()}  />;
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

export default VaultBorrow;
