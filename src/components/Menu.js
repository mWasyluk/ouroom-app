import React from "react";
import './Menu.css'
import { BiLogOut } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { GoInfo } from 'react-icons/go'
import { CgProfile } from 'react-icons/cg'

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                {
                    id: 0,
                    icon: <FiSettings className='icon' />,
                    description: 'Ustawienia'
                },
                {
                    id: 1,
                    icon: <CgProfile className='icon' />,
                    description: 'Profil'
                },
                {
                    id: 2,
                    icon: <GoInfo className='icon' />,
                    description: 'Informacje'
                },
                {
                    id: 3,
                    icon: <BiLogOut className='icon' />,
                    description: 'Wyloguj się'
                },
            ]
        }
    }

    handleOptionSelection = (e) => {
        const option = e.currentTarget;

        switch (option.id) {
            case '0':
                console.log('invoke settings')
                break;
            case '1':
                console.log('invoke profile')
                break;
            case '2':
                console.log('invoke info')
                break;
            case '3':
                console.log('invoke logout')
                break;
            default:
                console.log('none of the options')
        }
    }

    render() {
        let optionsView = this.state.options.map(option =>
            <div className="menu-item" key={option.id} id={option.id} onClick={this.handleOptionSelection}>
                {option.icon}
                <span>{option.description}</span>
            </div>
        )

        return (
            <div className="Menu">
                {optionsView}
            </div>
        )
    }
}