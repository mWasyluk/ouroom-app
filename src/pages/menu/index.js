import './style.css'

import { Link, useLocation } from 'react-router-dom';

import { menuOptions } from 'data/menu-options';

const MenuPage = () => {
    const location = useLocation();

    const state = { path: location.state?.path };

    return (
        <div className="Menu">
            {menuOptions.map(option =>
                <Link className="menu-item" key={option.id} id={option.id} to={option.link} state={state}>
                    {option.icon}
                    <span>{option.description}</span>
                </Link>
            )}
        </div>
    )
}

export default MenuPage;