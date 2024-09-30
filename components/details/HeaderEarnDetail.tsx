import React from "react";
import { useAccount } from "wagmi";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDetail from "../modal/VaultDetail";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import VaultWithdraw from "../modal/withdraw/VaultWithdraw";
import IconToken from "../token/IconToken";
import { IInvestmentProp } from "@/types";

const HeaderEarnDetail: React.FC<IInvestmentProp> = ({ item, updateInfo }) => {
  const { address: userAddress } = useAccount();

  return (
    <div className="flex flex-col sm:flex-row gap-8 w-full items-center justify-between mb-10">
      <div className="flex items-center gap-14">
        <div className="flex gap-2 items-center text-[30px] font-semibold justify-start">
          <IconToken tokenName={item.assetAddress} className="w-14 h-14" />
          <div className="ml-7">{item.vaultName}</div>
        </div>
        <div className="flex gap-2 items-center text-[16px] font-normal leading-normal">
          <IconToken
            tokenName={item.assetAddress}
            className="w-6 h-6 mr-3"
            showSymbol={true}
          />
        </div>
        <div className="flex gap-2 items-center text-[16px] font-normal leading-normal">
          {/* <IconToken tokenName={vault.tokenSymbol} className="w-6 h-6" /> */}
          <IconToken tokenName="wflow" className="w-6 h-6 mr-3" />
          <div>{item.curator}</div>
        </div>
      </div>
      <div className="flex gap-4 text-[16px]">
        {userAddress && (
          <>
            <ButtonDialog color="primary" buttonText="Deposit">
              {(closeModal) => (
                <div className="h-full w-full">
                  <VaultDeposit
                    updateInfo={updateInfo}
                    item={item}
                    closeModal={closeModal}
                  />
                </div>
              )}
            </ButtonDialog>
            <ButtonDialog color="primary" buttonText="Withdraw">
              {(closeModal) => (
                <div className="w-full h-full">
                  <VaultWithdraw
                    item={item}
                    updateInfo={updateInfo}
                    closeModal={closeModal}
                  />
                </div>
              )}
            </ButtonDialog>
          </>
        )}

        <ButtonDialog color="grey" buttonText="Vault Details">
          {(closeModal) => (
            <div className="h-full w-full">
              <VaultDetail item={item} closeModal={closeModal} />
            </div>
          )}
        </ButtonDialog>
      </div>
    </div>
  );
};

export default HeaderEarnDetail;
