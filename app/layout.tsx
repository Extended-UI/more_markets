import { ReactNode } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;