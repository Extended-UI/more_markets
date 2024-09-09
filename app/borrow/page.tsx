"use client";

import React from "react";
import BorrowMoreTable from "@/components/moreTable/BorrowMoreTable";
import LoanMoreTable from "@/components/moreTable/LoanMoreTable";

const BorrowPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl mb-4">My Loans</h1>
      <LoanMoreTable />

      <h1 className="text-4xl mb-4">MORE Markets</h1>
      <BorrowMoreTable />
    </div>
  );
};

export default BorrowPage;
