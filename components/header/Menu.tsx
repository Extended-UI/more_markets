"use client";
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';


const Menu: FC = () => {
    const pathname = usePathname();

    return (
        <div className="flex space-x-16 text-[14px] h-11 mt-4 text-white">
            <Link href="/earn" className={`${pathname === '/earn' ? 'glowing-text' : ''} hover:text-orange-500`}>
                Earn
            </Link>
            <Link href="/borrow" className={`${pathname === '/borrow' ? 'glowing-text' : ''} hover:text-orange-500`}>
                Borrow
            </Link>
        </div>
    );
};

export default Menu;



