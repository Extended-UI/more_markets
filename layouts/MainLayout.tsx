import React, { ReactNode } from "react";
import Header from "../components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
      <Header />
      <ToastContainer autoClose={3000} theme="dark" hideProgressBar={true} />
      <div className="mt-7 sm:mt-22">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
