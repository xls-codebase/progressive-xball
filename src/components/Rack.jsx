import RackLevel1 from '../assets/racks/level1.svg';
import RackLevel2 from '../assets/racks/level2.svg';
import RackLevel3 from '../assets/racks/level3.svg';
import RackLevel4 from '../assets/racks/level4.svg';
import RackLevel5 from '../assets/racks/level5.svg';
import RackLevel6 from '../assets/racks/level6.svg';
import RackLevel7 from '../assets/racks/level7.svg';
import RackLevel8 from '../assets/racks/level8.svg';
import RackLevel9 from '../assets/racks/level9.svg';

const Rack = ({level}) => {
    const BACKGROUND_IMAGES = [
        RackLevel1,
        RackLevel2,
        RackLevel3,
        RackLevel4,
        RackLevel5,
        RackLevel6,
        RackLevel7,
        RackLevel8,
        RackLevel9
    ];
    return (
        <div className="rack-info" style={{backgroundImage: `url(${BACKGROUND_IMAGES[level-1]})`}}></div>
    )
}

export default Rack;