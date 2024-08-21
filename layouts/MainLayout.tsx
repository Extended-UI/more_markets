import React, { ReactNode } from 'react';
import Header from '../components/header/Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
      <Header />
      <div style={{ marginTop: '80px' }}>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;