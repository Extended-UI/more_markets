// components/ToggleMore.tsx

import React, { useState } from 'react';

interface ToggleMoreProps {
  defaultChecked?: boolean;
}

const ToggleMore: React.FC<ToggleMoreProps> = ({ defaultChecked = false }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    console.log(`Toggle is now: ${!isChecked}`);
  };

  return (
    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label
        htmlFor="toggle"
        className="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
      ></label>
      <style jsx>{`
        .toggle-checkbox {
            z-index: 1;
            opacity: 0;
            position: absolute;
            margin: 4px 3px; // Vertically centered, adjust for balance
        }

        .toggle-label {
            transition: background-color 0.2s;
            width: 48px;
            height: 28px; // Increased for a taller track
            background-color: rgba(115, 115, 115, 0.1); // Default off state color
        }

        .toggle-label::before {
            content: "";
            position: absolute;
            top: 4px; // Correctly adjusted for vertical centering
            left: 26px; // Increased from 24px to add padding on the left
            width: 20px;
            height: 20px;
            background-color: #737373; // Grey color for the thumb
            border-radius: 50%;
            transition: transform 0.2s, background-color 0.2s;
        }

        .toggle-checkbox:checked + .toggle-label::before {
            transform: translateX(-24px); // Adjusted so that it does not overlap the edge when toggled
            background-color: #F58420; // Orange color when active
        }

        .toggle-checkbox:checked + .toggle-label {
            background-color: #F584201A;
        }
        `}</style>
    </div>
  );
};

export default ToggleMore;
