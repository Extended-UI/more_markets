"use client";

import { ToastContainer } from "react-toastify";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "../components/header/Header";
import { sactionedCountries } from "@/utils/const";
import SactionModal from "@/components/modal/SactionModal";
import "react-toastify/dist/ReactToastify.css";
import Banner from "@/components/header/Banner";
import WelcomePopup from "@/components/modal/Welcome-modal";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sactioned, setSactioned] = useState(false);
  const [hasBanner, setHasBanner] = useState(true);
  const [show, setShow] = useState(false);

  const closeModal = () => {
    setShow(false);
  };

  const checkRegion = async () => {
    try {
      const res = await fetch("https://get.geojs.io/v1/ip/country.json");

      if (res.ok) {
        const respData = await res.json();
        const countryInfo = respData.country;
        if (sactionedCountries.indexOf(countryInfo) >= 0) {
          setSactioned(true);
        } else {
          setSactioned(false);
        }
      }
    } catch (err) {
      console.log("Can not detect the location");
    }
  };

  useEffect(() => {
    checkRegion();
    const storedValue = localStorage.getItem("isChecked");
    const isChecked = storedValue ? JSON.parse(storedValue) : false;
    isChecked ? setShow(false) : setShow(true);
  }, []);

  return (
    <>
      {sactioned ? (
        <div style={{ maxWidth: "1380px", margin: "0 auto" }}>
          <div className="fixed inset-0 z-50 lg:px-[20%] flex items-center justify-center bg-black bg-opacity-75">
            <div className="modal-box rounded-[20px] max-w-full p-3 bg-[#343434]">
              <div className="h-full w-full">
                <SactionModal />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            {hasBanner ? <Banner setHasBanner={setHasBanner} /> : ""}
            <WelcomePopup closeModal={closeModal} show={show} />
            <div
              style={{
                maxWidth: "1380px",
                margin: hasBanner ? "55px auto 0" : "0 auto",
                padding: "0 5%",
              }}
            >
              <Header />
              <ToastContainer
                autoClose={3000}
                theme="dark"
                hideProgressBar={true}
              />
              <div className="mt-7 sm:mt-22">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainLayout;
