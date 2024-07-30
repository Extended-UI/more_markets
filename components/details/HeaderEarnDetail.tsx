import ButtonDialog from "../buttonDialog/buttonDialog";
import VaultDetail from "../modal/VaultDetail";
import VaultDeposit from "../modal/deposit/VaultDeposit";
import IconToken from "../token/IconToken";

const HeaderEarnDetail: React.FC = () => {
    return (
    <div className="flex flex-col sm:flex-row gap-8 w-full items-center justify-between my-4">
        <div className="flex items-center gap-10">
            <div className="flex gap-2 items-center text-[25px] items-start">
                <IconToken tokenName="usdc" className="w-10 h-10" />
                <div>USD max</div>
            </div>
            <div className="flex gap-2 items-center text-[14px] pt-2 leading-normal">
                <IconToken tokenName="abt" className="w-6 h-6 " />
                <div>USD max</div>
            </div>
            <div className="flex gap-2 items-center text-[14px] pt-2 leading-normal">
                <IconToken tokenName="usdt" className="w-6 h-6 " />
                <div>USD max</div>
            </div>
        </div>
        <div className="flex gap-2">
            <ButtonDialog color='primary' buttonText='Deposit' > 
                {(closeModal) => (
                <>
                    <div className="h-full w-full">
                    <VaultDeposit title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' closeModal={closeModal}></VaultDeposit>
                    </div>
                </>
                )}          
            </ButtonDialog>
            <ButtonDialog color='grey' buttonText='Vault Details' > 
                        {(closeModal) => (
                            <>
                            <div className="h-full w-full">
                            <VaultDetail title='USDMax Vault' token='USDC' apy={14.1} balance={473.18} ltv="90% / 125%" totalDeposit={3289.62} totalTokenAmount={1.96} curator='Flowverse' amount={0} validDeposit={function (): void {
                                    throw new Error("Function not implemented.");
                                } } closeModal={closeModal}></VaultDetail>
                            </div>
                            </>
                        )}          
            </ButtonDialog>
        </div>
      </div>
    );
  };
  
  export default HeaderEarnDetail;