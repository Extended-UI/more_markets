import VaultBorrow from '@/components/modal/VaultBorrow'
import React from 'react'

const Test = () => {

  const closeModal = () => {
    console.log("CLOSE")
  }

  return (
    <>
      <div className="artboard phone-1 w-full"><VaultBorrow title='USDMax' token='USDC' apy={14.1} balanceToken={473.18} balanceFlow={785.45} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' credora='AAA' closeModal={closeModal}  ></VaultBorrow></div>
    </>
  )
}

export default Test
