import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";

const EarnPage: React.FC = () => {
    return (
    <div >
      <h1 className="text-4xl mb-8">My Deposits</h1>
      <DepositMoreTable></DepositMoreTable>

      <h1 className="text-4xl mb-8">MORE Vaults</h1>
      <EarnMoreTable  ></EarnMoreTable>
    </div>
    );
  };
  
  export default EarnPage;