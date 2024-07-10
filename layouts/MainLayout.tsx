import React, { ReactNode } from 'react';
import Header from '../components/header/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div  style={{ marginTop: '90px' }} >
        <main >{children}</main>
      </div>
    </div>
  ); 
};

export default MainLayout;