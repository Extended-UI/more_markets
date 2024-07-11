import VaultDeposit from '@/components/modal/VaultDeposit'
import React from 'react'

const Test = () => {
  return (
    <>
      <div className="artboard phone-1"><VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse'></VaultDeposit></div>
    </>
  )
}

export default Test
