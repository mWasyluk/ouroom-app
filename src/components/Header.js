import './Header.css'
import { FiSettings } from 'react-icons/fi';
import Img from '../resources/wip-avatar.jpg'
import { useEffect, useState } from 'react';

export default function Header(props) {
    let [userHeader, setUserHeader] = useState()


    useEffect(() => {
        if (!props.user) return;

        let colorStyle = { backgroundColor: 'grey' }
        if (props.userStatus) {
            if (props.userStatus === 'offline') {
                colorStyle = { backgroundColor: 'red' }
            } else if (props.userStatus === 'online') {
                colorStyle = { backgroundColor: 'green' }
            }
        }
        const status = <span className='status' style={colorStyle}></span>;

        setUserHeader(
            <div className='user'>
                <img className='avatar' src={Img}></img>
                <span className='name'>{props.user.name}</span>
                {status}
            </div>
        )
    }, [props.user, props.userStatus])

    return (
        <div className="Header">
            <div className='left'>
                <FiSettings
                    size={'36'}
                ></FiSettings>
                {userHeader}
            </div>
            <div className='right'>
                <span className='title'>OuRoom!</span>
            </div>
        </div >
    )
}