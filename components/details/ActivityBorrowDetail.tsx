import React from 'react';
import InfoDetailGrey from './InfoDetailGrey';
import InfoDetail from './InfoDetail';
import SuppliersMoreTable from '../moreTable/SuppliersMoreTable';
import BorrowDetailPage from '@/app/borrow/[id]/page';
import BorrowersMoreTable from '../moreTable/BorrowersMoreTable';
import TransactionsMoreTable from '../moreTable/TransactionMoreTable';

const ActivityBorrowDetail = () => {
  return (
    <div className='flex w-full flex-col'>        
        <h1 className="text-4xl mt-14 mb-8">Activity</h1>
        <div className="flex flex-col w-full">
            <SuppliersMoreTable></SuppliersMoreTable>
            <BorrowersMoreTable></BorrowersMoreTable>
            <TransactionsMoreTable></TransactionsMoreTable>
        </div>
    </div>
    
  );
};

export default ActivityBorrowDetail;