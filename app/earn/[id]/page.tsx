"use client"
import HeaderEarnDetail from "@/components/details/HeaderEarnDetail";
import InfosEarnDetails from "@/components/details/InfosEarnDetail";
import DepositMoreTable from "@/components/moreTable/DepositMoreTable";
import DetailEarnMoreTable from "@/components/moreTable/DetailEarnMoreTable";
import EarnMoreTable from "@/components/moreTable/EarnMoreTable";
import { useRouter } from "next/navigation";

const EarnDetailPage: React.FC = () => {
  const router = useRouter();

  // Check if the router is ready and has populated all its fields
 

  return (
    <div>
      <div className="mb-8 overflow-visible">
        <HeaderEarnDetail></HeaderEarnDetail>
        <InfosEarnDetails></InfosEarnDetails>
      </div>
      <h1 className="text-4xl mt-16 mb-8">Vault Breakdown</h1>
      <DetailEarnMoreTable />
    </div>
  );
};

export default EarnDetailPage;
