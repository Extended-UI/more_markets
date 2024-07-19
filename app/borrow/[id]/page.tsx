"use client"
import ActivityBorrowDetail from "@/components/details/ActivityBorrowDetail";
import GraphsBorrowDetails from "@/components/details/GraphsBorrowDetails";
import HeaderBorrowDetail from "@/components/details/HeaderBorrowDetail";
import InfosBorrowDetails from "@/components/details/InfosBorrowDetail";
import PositionMoreTable from "@/components/moreTable/PositionMoreTable";
import { useRouter } from "next/navigation";

const BorrowDetailPage: React.FC = () => {
  const router = useRouter();

  // Check if the router is ready and has populated all its fields
 

  return (
    <div>
      <div className="mb-8 p-3">
        <HeaderBorrowDetail></HeaderBorrowDetail>
        <InfosBorrowDetails></InfosBorrowDetails>
        <PositionMoreTable></PositionMoreTable>
        <GraphsBorrowDetails></GraphsBorrowDetails>
        <ActivityBorrowDetail></ActivityBorrowDetail>
      </div>
      
    </div>
  );
};

export default BorrowDetailPage;
