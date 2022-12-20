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
            menuSelectionCallback: props.menuSelectionCallback,
            options: [
                {
                    id: 'menu-item-settings',
                    icon: <FiSettings className='icon' />,
                    description: 'Ustawienia'
                },
                {
                    id: 'menu-item-profile',
                    icon: <CgProfile className='icon' />,
                    description: 'Profil'
                },
                {
                    id: 'menu-item-information',
                    icon: <GoInfo className='icon' />,
                    description: 'Informacje'
                },
                {
                    id: 'menu-item-logout',
                    icon: <BiLogOut className='icon' />,
                    description: 'Wyloguj się'
                },
            ]
        }
    }

    handleOptionSelection = (e) => {
        const optionId = e.currentTarget.id;
        this.props.menuSelectionCallback(optionId);
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