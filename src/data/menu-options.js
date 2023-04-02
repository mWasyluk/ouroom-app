import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { GoInfo } from "react-icons/go";
import { locationPaths } from "./location-paths";

export const menuOptions = [
    {
        id: 'menu-item-settings',
        icon: <FiSettings className='icon' />,
        link: locationPaths.settings,
        description: 'Ustawienia'
    },
    {
        id: 'menu-item-profile',
        icon: <CgProfile className='icon' />,
        link: locationPaths.profile,
        description: 'Profil'
    },
    {
        id: 'menu-item-information',
        icon: <GoInfo className='icon' />,
        link: locationPaths.informations,
        description: 'Informacje'
    },
    {
        id: 'menu-item-logout',
        icon: <BiLogOut className='icon' />,
        link: locationPaths.logout,
        description: 'Wyloguj się'
    },
]