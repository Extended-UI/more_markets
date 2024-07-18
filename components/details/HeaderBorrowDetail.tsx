import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDeposit from "../modal/VaultDepositConfirm";
import IconToken from "../token/IconToken";

const HeaderBorrowDetail: React.FC = () => {
    return (
    <div className="flex w-full items-center justify-between my-4">
        <div className="flex items-center gap-10">
        <div className="flex gap-2 items-center text-[25px] items-start">
            <IconToken tokenName="usdc" className="w-10 h-10" />
            <div>USDMax/USDC</div>
        </div>
    </div>
        <div className="flex gap-2">
            <ButtonDialog color='secondary' buttonText='Deposit' > 
                        {(closeModal) => (
                            <>
                            <div className="h-full w-full">
                            <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' amount={0} validDeposit={function (): void {
                                    throw new Error("Function not implemented.");
                                } } closeModal={function (): void {
                                    throw new Error("Function not implemented.");
                                } }></VaultDeposit>
                            </div>
                            </>
                        )}          
            </ButtonDialog>
            <ButtonDialog color='grey' buttonText='Market Details' > 
                        {(closeModal) => (
                            <>
                            <div className="h-full w-full">
                            <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' amount={0} validDeposit={function (): void {
                                    throw new Error("Function not implemented.");
                                } } closeModal={function (): void {
                                    throw new Error("Function not implemented.");
                                } }></VaultDeposit>
                            </div>
                            </>
                        )}          
            </ButtonDialog>
        </div>
      </div>
    );
  };
  
  export default HeaderBorrowDetail;