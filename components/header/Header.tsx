import { FC } from 'react';
import Image from 'next/image';
import FlowButton from './FlowButton';
import AddressBadge from './AddressBadge';
import logo from '@/public/assets/icons/logo.png'
import Menu from './Menu';


const Header: FC = () => {

    return (
        <header className=" pt-2 p-4">
            <nav className="  flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src={logo} alt="Logo" width={35} height={35} />
                </div>
                <Menu></Menu>
                <div className="flex space-x-4">
                    <FlowButton></FlowButton>
                    <AddressBadge></AddressBadge>
                </div>
            </nav>
        </header>
    );
};

export default Header;
