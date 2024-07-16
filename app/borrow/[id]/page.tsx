"use client"
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import { useRouter } from "next/navigation";

const borrowDetailPage: React.FC = () => {
  const router = useRouter();

  // Check if the router is ready and has populated all its fields
 

  return (
    <div>
      <div className="mb-8">
        <HeaderBorrowDetail></HeaderBorrowDetail>
        <InfosBorrowDetails></InfosBorrowDetails>
      </div>
      <h1 className="text-4xl mt-16 mb-8">Vault Breakdown</h1>
      
    </div>
  );
};

export default borrowDetailPage;
