import { MoreAction } from "./const";
import { IMoreError } from "@/types";

export const MoreErrors: IMoreError[] = [
  {
    action: MoreAction.GENERAL,
    error: "User rejected the request",
    message: "User rejected the request.",
  },
  {
    action: MoreAction.GENERAL,
    error: "token balance is not sufficient",
    message: "You do not have enough token_name to execute this transaction.",
  },
  {
    action: MoreAction.GENERAL,
    error: "token allownace is not sufficient",
    message:
      "The token_name token allowance you set is not high enough to continue this transaction.",
  },
  {
    action: MoreAction.GENERAL,
    error: "invalid signature",
    message: "The transaction signature does not match the expected signature.",
  },
  {
    action: MoreAction.GENERAL,
    error: "unauthorized sender",
    message: "You are not authorized to sign this transaction.",
  },
  {
    action: MoreAction.GENERAL,
    error: "eth_signTypedData_v4",
    message:
      "Your wallet currently does not support signing transactions. Please try again later!",
  },
  {
    action: MoreAction.DEPOSIT,
    error: "all caps reached",
    message: "Your deposit exceeds the maximum deposit amount.",
  },
  {
    action: MoreAction.WITHDRAW,
    error: "not enough liquidity to withdraw",
    message:
      "The amount of liqudiity you are attempting to withdraw exceeds the market's available liquidity.",
  },
  {
    action: MoreAction.BORROW,
    error: "insufficient collateral",
    message: "You do not have enough collateral to borrow.",
  },
  {
    action: MoreAction.BORROW_MORE,
    error: "insufficient collateral",
    message: "You do not have enough collateral to borrow more.",
  },
  {
    action: MoreAction.REPAY,
    error: "insufficient collateral",
    message: "Your repayment is insufficient for maintaining your position.",
  },
  {
    action: MoreAction.ADD_COLLATERAL,
    error: "supply cap exceeded",
    message: "Your supplied collateral exceeds the maximum amount.",
  },
  {
    action: MoreAction.WITHDRAW_COLLATERAL,
    error: "insufficient collateral",
    message: "You do not have enough collateral for maintaining your position.",
  },
];

export const errMessages = {
  invalid_amount: "Invalid input amount.",
  insufficient_amount: "Insufficient token balance.",
  withdraw_exceeded: "Input amount exceeds deposit balance.",
};
