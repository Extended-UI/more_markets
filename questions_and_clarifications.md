# Earn Page

## DepositMoreTable - `user`

1. tokenName
2. apy
3. curator
4. depositAmount
5. depositValueUSD
6. collaterals

## EarnMoreTable - `total`

1. tokenSymbol
2. netAPY
3. totalDeposits
4. totalValueUSD
5. curator
6. collateral
7. unsecured
8. unsecuredAPY
9. credoraRating - recalc rating to letters evaluation - MOCK

# Borrow Page

## LoanMoreTable - `user`

1. token
2. amount
3. valueUSD
4. liquidationLTV - over collaterized
5. liquidationLTV2
6. borrowAPY

## BorrowMoreTable - `total`

1. collateralToken
2. loanToken
3. liquidationLTV
4. liquidationLTV2
5. borrowAPY
6. utilization
7. totalDeposits
8. totalValueUSD


## Modals

### add

`supply`
1. call `approve` with exact amount

### borrow
`borrow`

2 actions on FE ? need extra data in component 

### deposit

`supplyCollateral`

approve to markets address ? max or amounts?

### repay

`repay`

### withdraw

`withdrawCollateral`

### withdrawBorrow

`withdraw`
