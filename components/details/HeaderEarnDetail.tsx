import { useAccount } from "wagmi";
import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDetail from "../modal/VaultDetail";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";
import { IInvestmentProp } from "@/types";

const HeaderEarnDetail: React.FC<IInvestmentProp> = ({ item, updateInfo }) => {
  const { address: userAddress } = useAccount();

  return (
    <div className="flex flex-col sm:flex-row gap-8 w-full items-center justify-between my-4">
      <div className="flex items-center gap-14">
        <div className="flex gap-2 items-center text-[25px] items-start">
          <IconToken tokenName={item.assetAddress} className="w-10 h-10" />
          <div>{item.vaultName}</div>
        </div>
        <div className="flex gap-2 items-center text-[14px] pt-2 leading-normal">
          <IconToken
            tokenName={item.assetAddress}
            className="w-6 h-6"
            showSymbol={true}
          />
        </div>
        <div className="flex gap-2 items-center text-[14px] pt-2 leading-normal">
          {/* <IconToken tokenName={vault.tokenSymbol} className="w-6 h-6 " /> */}
          <IconToken tokenName="wflow" className="w-6 h-6" />
          <div>{item.curator}</div>
        </div>
      </div>
      <div className="flex gap-2">
        {userAddress && (
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
        )}

        <ButtonDialog color="grey" buttonText="Vault Details">
          {(closeModal) => (
            <div className="h-full w-full">
              <VaultDetail item={item} />
            </div>
          )}
        </ButtonDialog>
      </div>
    </div>
  );
};

export default HeaderEarnDetail;
