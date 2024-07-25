"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import MoreButton from '../moreButton/MoreButton';

interface ButtonDialogProps {
  buttonText: string;
  color: string;
  children: (toggleModal: () => void) => ReactNode;
}

const ButtonDialog: React.FC<ButtonDialogProps> = ({ buttonText, color, children }) => {

  // Generate a unique id for the modal
  const [modalId, setModalId] = useState('');

  useEffect(() => {
      setModalId(`my_modal_${Math.random().toString(36).slice(2, 11)}`);
  }, []); // Triggers once after initial mount

  if (!modalId) return null; 

  const backgroundStyle = {
    backgroundColor: `${color}1A`,
  };

  // Function to programmatically close the modal by clicking the label associated with the checkbox
  const toggleModal = () => {
    console.log("toggleModal: ", modalId);
    document.getElementById(modalId)?.click();
  };

  return (
    <div>
      {/* The button to open modal : THIS IS DAISY UI IT ONLY WORK WITH htmlFor */}
      <MoreButton text={buttonText} color={color} onClick={toggleModal}></MoreButton>

      {/* Hidden checkbox to control modal */}
      <input type="checkbox" id={modalId} className="modal-toggle" />

      {/* Modal */}
      <div className="modal" role="dialog">
        <div className="modal-box max-w-full px-[10px] py-[10px] sm:min-w-[430px] sm:w-[40%] w-[90%] rounded-[5%] bg-[#343434]">
          {children(toggleModal)}
        </div>
        <label className="modal-backdrop" htmlFor={modalId}>Close</label>
      </div>
    </div>
  );
};

export default ButtonDialog;
