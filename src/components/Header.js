import './header-style.css'

import { useEffect, useState } from 'react';

const Header = (props) => {
    const {
        user = {},
        userStatus = 'offline',
        icon = <></>,
        onIconClick = () => { },
    } = props

    let [userHeader, setUserHeader] = useState()

    useEffect(() => {
        if (!user) return;

        let colorStyle = { backgroundColor: 'grey' }
        if (userStatus) {
            if (userStatus === 'offline') {
                colorStyle = { backgroundColor: '#b92e2e' }
            } else if (userStatus === 'online') {
                colorStyle = { backgroundColor: '#019301' }
            }
        }
        const status = <span className='status' style={colorStyle}></span>;
        const userFullName = user.profile.firstName + ' ' + user.profile.lastName;
        setUserHeader(
            <div className='user'>
                <img alt='User Avatar' className='avatar' src={user.profile.avatar.imageUrl}></img>
                <span className='name'>{userFullName}</span>
                {status}
            </div>
        )
    }, [user, userStatus])

    return (
        <div className="Header">
            <div className='left'>
                <i className='header-button' onClick={onIconClick}>{icon}</i>
                {userHeader}
            </div>
            <div className='right'>
                <span className='title'>OuRoom!</span>
            </div>
        </div >
    )
}

export default Header;