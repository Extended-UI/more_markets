import React, { ReactNode, useState } from "react";
import Header from "../components/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "@/components/header/Banner";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  const [hasBanner, setHasBanner] = useState(true)

  return (
    <div className="relative">
    {
      hasBanner ? (
        <Banner
          setHasBanner={setHasBanner}
        />
      ):''
    }
      <div style={{ maxWidth: "1380px", margin: hasBanner ? "55px auto 0" : "0 auto", padding: "0 5%" }} >
        <Header/>
        <ToastContainer autoClose={3000} theme="dark" hideProgressBar={true} />
        <div className="mt-7 sm:mt-22">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
