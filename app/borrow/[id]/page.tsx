"use client"
import ActivityBorrowDetail from "@/components/details/ActivityBorrowDetail";
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import PositionMoreTable from "@/components/moreTable/PositionMoreTable";
import { useRouter } from "next/navigation";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();

  // Check if the router is ready and has populated all its fields
 

  return (
    <div>
      <div className="mb-8">
        <HeaderBorrowDetail></HeaderBorrowDetail>
        <InfosBorrowDetails></InfosBorrowDetails>
        <PositionMoreTable></PositionMoreTable>
        <ActivityBorrowDetail></ActivityBorrowDetail>
      </div>
      
    </div>
  );
};

export default BorrowDetailPage;
