import './Header.css'
import { FiSettings } from 'react-icons/fi';
import Img from '../resources/img.jpg'

export default function Header(props) {
    return (
        <div className="Header">
            <div className='left'>
                <FiSettings
                    size={'36'}
                ></FiSettings>
                <div className='user'>
                    <img className='avatar' src={Img}></img>
                    <span className='name'>{props.user.name}</span>
                </div>
            </div>
            <div className='right'>
                <span className='title'>OuRoom!</span>
            </div>
        </div >
    )
}