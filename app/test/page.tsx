import VaultBorrow from '@/components/modal/VaultBorrow'
import React from 'react'

const Test = () => {
  return (
    <>
      <div className="artboard phone-1 w-full"><VaultBorrow title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse'></VaultBorrow></div>
    </>
  )
}

export default Test
