import { useAccount } from "wagmi";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import ButtonDialog from "../buttonDialog/buttonDialog";
import ListIconToken from "@/components/token/ListIconToken";
import { BorrowPosition, IBorrowMarketProp } from "@/types";
import { getTokenInfo } from "@/utils/utils";

const HeaderBorrowDetail: React.FC<IBorrowMarketProp> = ({
  item,
  updateInfo,
}) => {
  const { address: userAddress } = useAccount();

  const collateralToken = getTokenInfo(item.inputToken.id).symbol;
  const borrowToken = getTokenInfo(item.borrowedToken.id).symbol;

  return (
    <div className="flex w-full items-center justify-between mb-10">
      <div className="flex items-center gap-10">
        <div className="flex gap-8 items-center text-[30px] font-semibold">
          <ListIconToken
            iconNames={[item.inputToken.id, item.borrowedToken.id]}
            className={'w-14 h-14'}
          />
          {collateralToken + " / " + borrowToken}
        </div>
      </div>
      {userAddress && (
        <div className="flex gap-2 text-[16px]">
          <ButtonDialog color="secondary" buttonText="Borrow">
            {(closeModal) => (
              <div className="h-full w-full">
                <VaultBorrow
                  item={item as BorrowPosition}
                  updateInfo={updateInfo}
                  closeModal={closeModal}
                />
              </div>
            )}
          </ButtonDialog>
          {/* <ButtonDialog color="grey" buttonText="Market Details">
          {(closeModal) => (
            <>
              <div className="h-full w-full">
                <VaultDetail
                  title="USDMax Vault"
                  token="USDC"
                  apy={14.1}
                  balance={473.18}
                  ltv="90% / 125%"
                  totalDeposit={3289.62}
                  totalTokenAmount={1.96}
                  curator="Flowverse"
                  amount={0}
                  validDeposit={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  closeModal={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                ></VaultDetail>
              </div>
            </>
          )}
        </ButtonDialog> */}
        </div>
      )}
    </div>
  );
};

export default HeaderBorrowDetail;
