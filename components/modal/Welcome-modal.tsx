"use client";

import React, { useEffect, useState } from "react";
import MoreButton from "../moreButton/MoreButton";
import { InvestmentData } from "@/types";

interface Props {
  show: boolean;
  closeModal: () => void;
}

const WelcomePopup: React.FC<Props> = ({ closeModal, show }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setIsChecked(event.target.checked);
    console.log(
      "Checkbox is " + (event.target.checked ? "checked" : "unchecked")
    );
    localStorage.setItem("isChecked", event.target.checked.toString());
  };

  return (
    <>
      {show ? (
        <div className="fixed inset-0 z-50 lg:px-[20%] flex items-center justify-center bg-black bg-opacity-75">
          <div
            className="modal-box rounded-[24px] max-w-full p-3 bg-[#343434]"
            onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
          >
            <div className="more-bg-secondary w-full rounded-[20px] modal-base">
              <div className="px-[28px] pt-[50px] pb-[30px] font-[16px]">
                <img
                  src={"assets/icons/logo.png"}
                  alt="Logo"
                  width={36}
                  height={36}
                  className="mb-[30px]"
                />
                <div className="text-[24px] mb-[30px] font-semibold">
                  Welcome to MORE Markets!
                </div>
                <div className="mb-[30px] text-[16px] font-medium leading-10">
                  To use the app, please acknowledge that you agree with the
                  terms of use and privacy policy by ticking the box below.
                </div>
                <label className="label cursor-pointer flex justify-start">
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px]"
                    style={{ accentColor: "#f58420", color: "#ffffff" }}
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <div className="text-[16px] font-medium leading-10 ml-5">
                    I agree to the{" "}
                    <a
                      className="underline"
                      href="https://docs.more.markets/agreements/terms-of-use"
                      target="_blank"
                    >
                      Terms of Use
                    </a>{" "}
                    and the{" "}
                    <a
                      className="underline"
                      href="https://docs.more.markets/agreements/privacy-policy"
                      target="_blank"
                    >
                      privacy policy.
                    </a>{" "}
                  </div>
                </label>
              </div>
              <div className="rounded-b-[20px] px-[28px] pb-[30px]">
                <div className="flex justify-end">
                  <MoreButton
                    className="text-2xl py-2"
                    text="Continue"
                    onClick={closeModal}
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default WelcomePopup;
