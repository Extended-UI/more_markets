"use client";

import React, { ReactNode, useState } from "react";
import MoreButton from "../moreButton/MoreButton";
import { Market } from "@/types";

interface ButtonDialogProps {
  buttonText: string;
  color: string;
  item: Market | null;
  children: (toggleModal: () => void) => ReactNode;
  onButtonClick?: () => void;
}

const ButtonDialog: React.FC<ButtonDialogProps> = ({
  buttonText,
  color,
  item,
  children,
  onButtonClick,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    if (item) {
      setIsModalVisible(!isModalVisible);
      if (onButtonClick) {
        onButtonClick();
      }
    } else {
      alert("No supply queue");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div>
      <MoreButton text={buttonText} color={color} onClick={toggleModal} />
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 lg:px-[20%] flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal} // Close modal when background is clicked
        >
          <div
            className="modal-box max-w-full px-4 py-4 rounded-lg bg-[#343434]"
            onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
          >
            {children(closeModal)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonDialog;
