"use client";

import React, { ReactNode, useState } from 'react';
import MoreButton from '../moreButton/MoreButton';

interface ButtonDialogProps {
  buttonText: string;
  color: string;
  children: (toggleModal: () => void) => ReactNode;
}

const ButtonDialog: React.FC<ButtonDialogProps> = ({ buttonText, color, children }) => {

  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* The button to open modal */}
      <MoreButton text={buttonText} color={color} onClick={toggleModal} />

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          role="dialog"
          style={{ zIndex: 1000000 }}
        >
          <div 
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleModal}
            style={{ zIndex: 999999 }}
          ></div>
          <div 
            className="modal-box max-w-full px-[10px] py-[10px] sm:min-w-[430px] sm:w-[40%] w-[90%] rounded-[5%] bg-[#343434]"
            style={{ zIndex: 1000001 }}
          >
            {children(toggleModal)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonDialog;
