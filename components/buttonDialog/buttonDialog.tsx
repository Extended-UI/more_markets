"use client";

import React, { ReactNode } from 'react';
import MoreButton from '../moreButton/MoreButton';

interface ButtonDialogProps {
  buttonText: string;
  color: string;
  children: (toggleModal: () => void) => ReactNode;
}

const ButtonDialog: React.FC<ButtonDialogProps> = ({ buttonText, color, children }) => {

  

  const backgroundStyle = {
    backgroundColor: `${color}1A`,
  };

  // Function to programmatically close the modal by clicking the label associated with the checkbox
  const toggleModal = () => {
    document.getElementById('my_modal_7')?.click();
  };

  return (
    <div>
      {/* The button to open modal : THIS IS DAISY UI IT ONLY WORK WITH htmlFor */}
      
      <MoreButton text={buttonText} color={color} onClick={toggleModal} ></MoreButton>

      {/* Hidden checkbox to control modal */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />

      {/* Modal */}
      <div className="modal" role="dialog">
        <div className="modal-box max-w-full px-[10px] py-[10px]  sm:min-w-[430px] sm:w-[40%] w-[90%] h-[50%] rounded-[5%] bg-[#343434]">
          {children(toggleModal)}
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
    </div>
  );
};

export default ButtonDialog;
