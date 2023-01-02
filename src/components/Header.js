import '../styles/Header.css'

import { useEffect, useState } from 'react';

import { CgMenuGridR } from 'react-icons/cg';

const Header = (props) => {
    const {
        user = {},
        userStatus = 'offline',
        isMenuInvoked = false,
        setMenuInvoked = () => { }
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

    const handleClick = () => {
        setMenuInvoked(!isMenuInvoked)
    }

    return (
        <div className="Header">
            <div className='left'>
                <CgMenuGridR className='menu-button' onClick={handleClick} size={'36'} />
                {userHeader}
            </div>
            <div className='right'>
                <span className='title'>OuRoom!</span>
            </div>
        </div >
    )
}

export default Header;