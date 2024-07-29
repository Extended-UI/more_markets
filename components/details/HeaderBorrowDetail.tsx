import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDetail from "../modal/VaultDetail";
import VaultBorrow from "../modal/borrow/VaultBorrow";
import VaultDeposit from "../modal/deposit/VaultDepositConfirm";
import IconToken from "../token/IconToken";

const HeaderBorrowDetail: React.FC = () => {
    return (
    <div className="flex w-full items-center justify-between my-4">
        <div className="flex items-center gap-10">
        <div className="flex gap-2 items-center sm:text-[25px] text-[16px] items-start">
            <IconToken tokenName="usdc" className="w-10 h-10 " />
            <div>USDMax/USDC</div>
        </div>
    </div>  
        <div className="flex gap-2">
            <ButtonDialog color='secondary' buttonText='Borrow' > 
                        {(closeModal) => (
                            <>
                            <div className="h-full w-full">
                                <VaultBorrow title='USDMax' token={"usdc"} apy={14.1} balanceToken={473.18} balanceFlow={785.45} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' credora='AAA' closeModal={closeModal} ></VaultBorrow>

                            </div>
                            </>
                        )}          
            </ButtonDialog>
            <ButtonDialog color='grey' buttonText='Market Details' > 
                        {(closeModal) => (
                            <>
                            <div className="h-full w-full">
                            <VaultDetail title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' amount={0} validDeposit={function (): void {
                                    throw new Error("Function not implemented.");
                                } } closeModal={function (): void {
                                    throw new Error("Function not implemented.");
                                } }></VaultDetail>
                            </div>
                            </>
                        )}          
            </ButtonDialog>
        </div>
      </div>
    );
  };
  
  export default HeaderBorrowDetail;