import React from 'react';

interface IconTokenProps {
    imageName: string;
}

const IconToken: React.FC<IconTokenProps> = ({ imageName }) => {
    return (
        <div className="flex">
            <div className="mr-2 w-6 h-6">
                <img src={`./assets/tokens/${imageName}.svg`} alt={imageName} />
            </div>
        </div>
    );
};

export default IconToken;