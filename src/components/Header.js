import './Header.css'
import { FiSettings } from 'react-icons/fi';
import Img from '../resources/wip-avatar.jpg'
import { useEffect, useState } from 'react';

export default function Header(props) {
    let [userHeader, setUserHeader] = useState(0)

    useEffect(() => {
        if (props.user) {
            setUserHeader(
                <div className='user'>
                    <img className='avatar' src={Img}></img>
                    <span className='name'>{props.user.name}</span>
                </div>
            )

        } else {
            setUserHeader("You should never see this")
        }
    }, [props.user])

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