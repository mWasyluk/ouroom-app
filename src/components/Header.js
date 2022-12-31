import '../styles/Header.css'

import { useEffect, useState } from 'react';

import { CgMenuGridR } from 'react-icons/cg';

export default function Header(props) {
    let [userHeader, setUserHeader] = useState()

    useEffect(() => {
        if (!props.user) return;

        let colorStyle = { backgroundColor: 'grey' }
        if (props.userStatus) {
            if (props.userStatus === 'offline') {
                colorStyle = { backgroundColor: '#b92e2e' }
            } else if (props.userStatus === 'online') {
                colorStyle = { backgroundColor: '#019301' }
            }
        }
        const status = <span className='status' style={colorStyle}></span>;
        const userFullName = props.user.profile.firstName + ' ' + props.user.profile.lastName;
        setUserHeader(
            <div className='user'>
                <img alt='User Avatar' className='avatar' src={props.user.profile.avatar.imageUrl}></img>
                <span className='name'>{userFullName}</span>
                {status}
            </div>
        )
    }, [props.user, props.userStatus])

    const handleClick = () => {
        props.setMenuInvoked(!props.isMenuInvoked)
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