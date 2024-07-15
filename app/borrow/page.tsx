import BorrownMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";

const BorrownPage: React.FC = () => {
    return (
    <div >
      <h1 className="text-4xl mb-4">My Loans</h1>
      <LoanMoreTable  ></LoanMoreTable>

      <h1 className="text-4xl mb-4">MORE Markets</h1>
      <BorrownMoreTable  ></BorrownMoreTable>
    </div>
    );
  };
  
  export default BorrownPage;