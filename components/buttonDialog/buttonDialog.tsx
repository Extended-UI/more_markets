"use client";

import React, { ReactNode, useState } from "react";
import MoreButton from "../moreButton/MoreButton";

interface ButtonDialogProps {
  color: string;
  buttonText: string;
  children: (toggleModal: () => void) => ReactNode;
  onButtonClick?: () => void;
}

const ButtonDialog: React.FC<ButtonDialogProps> = ({
  buttonText,
  color,
  children,
  onButtonClick,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    if (onButtonClick) {
      onButtonClick();
    }

    setIsModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <>
      <MoreButton text={buttonText} color={color} onClick={toggleModal} />
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 lg:px-[20%] flex items-center justify-center bg-black bg-opacity-75"
          // onClick={closeModal} // Close modal when background is clicked
        >
          <div
            className="modal-box rounded-[24px] max-w-full p-3 bg-[#343434]"
            onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
          >
            {children(closeModal)}
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonDialog;
