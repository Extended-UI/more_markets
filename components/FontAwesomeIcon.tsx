import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Solid icons
import { faCaretDown, faCaretUp ,faCircleInfo, faCircleCheck, faCircle } from '@fortawesome/free-solid-svg-icons';



// Regular icons
// import { faSmile } from '@fortawesome/free-regular-svg-icons';

library.add(  
    faCaretDown,
    faCaretUp,
    faCircleInfo,
    faCircleCheck,
    faCircle
);

interface IconProps {
  icon: IconProp;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ icon, className, style }) => {
  return <FontAwesomeIcon icon={icon} className={className} style={style} />;
};

export default Icon;