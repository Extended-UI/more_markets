"use client";
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import FlowButton from './FlowButton';
import AddressBadge from './AddressBadge';

const Header: FC = () => {
    const pathname = usePathname();

    return (
        <header className="px-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                </div>
                <div className="flex space-x-8 text-[14px]">
                    <Link href="/earn" className={`${pathname === '/earn' ? 'glowing-text' : ''} hover:text-orange-500`}>
                        Earn
                    </Link>
                    <Link href="/borrow" className={`${pathname === '/borrow' ? 'glowing-text' : ''} hover:text-orange-500`}>
                        Borrow
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <FlowButton></FlowButton>
                    <AddressBadge></AddressBadge>
                </div>
            </nav>
        </header>
    );
};

export default Header;
