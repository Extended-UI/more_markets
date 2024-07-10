import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Solid icons
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';



// Regular icons
// import { faSmile } from '@fortawesome/free-regular-svg-icons';

library.add(  
    faCaretDown
);

interface IconProps {
  icon: IconProp;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className }) => {
  return <FontAwesomeIcon icon={icon} className={className} />;
};

export default Icon;