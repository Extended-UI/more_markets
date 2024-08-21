import { ReactNode } from 'react';
import Header from '../components/header/Header';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import MainLayout from '@/layouts/MainLayout';
import logo from '@/public/assets/icons/logo.png'

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/assets/icons/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
        <link rel="icon" href="/assets/icons/android-chrome-192x192.png" sizes="192x192" />
        <link rel="icon" href="/assets/icons/android-chrome-512x512.png" sizes="512x512" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default RootLayout;