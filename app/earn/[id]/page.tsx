"use client"
import HeaderEarnDetail from "@/components/details/HeaderEarnDetail";
import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import { useRouter } from "next/navigation";

const EarnDetailPage: React.FC = () => {
  const router = useRouter();

  // Check if the router is ready and has populated all its fields
 

  return (
    <div>
      <div className="mb-8">
        <HeaderEarnDetail></HeaderEarnDetail>
      </div>
      <h1 className="text-4xl mb-8">MORE Vaults</h1>
      <EarnMoreTable inDetail = {false }/>
    </div>
  );
};

export default EarnDetailPage;
