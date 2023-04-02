import './AppHeader.css'

import { CgArrowLeft, CgMenuGridR } from 'react-icons/cg';
import { useLocation, useNavigate } from 'react-router';

import DefImg from 'assets/default-avatar.png'
import { locationPaths } from 'data/location-paths';
import { useAccount } from 'contexts/account/AccountProvider';
import { useWebsocket } from 'contexts/websocket/websocket';
import { useWindowDimensions } from 'utils/window-utils';

const menuIcon = <CgMenuGridR />;
const backIcon = <CgArrowLeft />;

const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isBigScreen, isSmallScreen } = useWindowDimensions();
    const { profile } = useAccount();
    const websocket = useWebsocket();

    const isMenuOpen = location.pathname.includes('/menu');

    const handleButtonClick = () => {
        if (location.pathname !== locationPaths.menu) {
            let options = {};
            if (isMenuOpen) {
                options.replace = true;
            }
            options.state = { path: location.state?.path || location.pathname };

            navigate(locationPaths.menu, options);
        } else {
            navigate(location.state?.path || locationPaths.home);
        }
    }

    return (
        <div className="Header">
            <div className='left'>
                <i className='header-button' onClick={handleButtonClick}>{isMenuOpen ? backIcon : menuIcon}</i>
                <div className='user'>
                    {!isSmallScreen ?
                        <img alt='User Avatar' className='avatar' src={profile.avatar?.imageUrl || DefImg}></img>
                        : <></>}

                    {isBigScreen ? <>
                        <span className='name'>{`${profile.firstName} ${profile.lastName}`}</span>
                    </> : <></>}

                    <span className='status' style={{ background: websocket.isConnected ? '#019301' : '#b92e2e' }}></span>
                </div>
            </div>

            <div className='right'>
                <span className='title'>OuRoom!</span>
            </div>
        </div >
    )
}

export default AppHeader;