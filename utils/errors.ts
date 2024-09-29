import { MoreAction } from "./const";
import { IMoreError } from "@/types";

export const MoreErrors: IMoreError[] = [
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
    message: "You do not have enough collateral to increase borrow more.",
  },
  {
    action: MoreAction.BORROW_MORE,
    error: "insufficient collateral",
    message: "You do not have enough collateral to increase borrow more.",
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
];
