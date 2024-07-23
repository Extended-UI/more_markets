"use client";
import Link from 'next/link';
import { FC } from 'react';
import { usePathname } from 'next/navigation';


const Menu: FC = () => {
    const pathname = usePathname();

    return (
        <div className="flex space-x-16 text-[14px] h-11 mt-4 ">
            <Link href="/earn" className={`${pathname.includes('/earn') ? 'glowing-text-primary' : ''} hover:text-primary`}>
                Earn
            </Link>
            <Link href="/borrow" className={`${pathname.includes('/borrow') ? 'glowing-text-secondary' : ''} hover:text-secondary`}>
                Borrow
            </Link>
        </div>
    );
};

export default Menu;



