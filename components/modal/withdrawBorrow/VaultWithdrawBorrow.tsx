"use client";
import React, { useState } from 'react';
import VaultWithdrawSet from './VaultWithdrawBorrowSet';
import VaultWithdrawTransaction from './VaultWithdrawBorrowTransaction';
import VaultWithdrawConfirm from './VaultWithdrawBorrowConfirm';

interface Props {
  title: string;
  token: string;
  balance: number;
  apy: number;
  ltv: string;
  totalWithdraw: number;
  totalTokenAmount: number;
  curator: string;
  closeModal: () => void;
}

const VaultWithdraw: React.FC<Props> = ({ title, token, balance, apy, ltv, totalWithdraw, totalTokenAmount, curator, closeModal }) => {

  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);

  const handleSetWithdraw = (amount: number) => {
    console.log("DEPOSIT SET", amount)    
    setAmount(amount);
    setStep(2);
  };


  const handleValidWithdraw = () => {
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
        return <VaultWithdrawSet title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalWithdraw={totalWithdraw} totalTokenAmount={totalTokenAmount} setAmount={(amount: number) => handleSetWithdraw(amount)}  closeModal={closeModal} />;
      case 2:
        return <VaultWithdrawTransaction title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalWithdraw={totalWithdraw} totalTokenAmount={totalTokenAmount} curator={curator} amount={amount}  validWithdraw={() => handleValidWithdraw()}  closeModal={closeModal} />;
      case 3:
        return <VaultWithdrawConfirm  amount={amount}  title={title} token={token} balance={balance} apy={apy} ltv={ltv} totalWithdraw={totalWithdraw} totalTokenAmount={totalTokenAmount} processDone={() => handleProcessDone()} closeModal={closeModal}  ></VaultWithdrawConfirm>
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

export default VaultWithdraw;
