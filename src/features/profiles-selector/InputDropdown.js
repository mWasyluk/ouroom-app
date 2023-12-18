import { useEffect, useState } from "react";

import { MdOutlinePersonSearch } from 'react-icons/md';
import Profile from "models/Profile";
import ProfilesList from "./ProfilesList";
import { searchProfiles } from "api-services/profilesApi";
import { useAuth } from "contexts/auth/AuthProvider";

const InputDropdown = (props) => {
    const {
        selectedProfiles = [],
        selectProfile = () => { },
        itemIcon = {}
    } = props;

    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [foundProfiles, setFoundProfiles] = useState([])
    const [idsToHide, setIdsToHide] = useState();
    const [searchPrefixes, setSearchPrefixes] = useState(['', '']);
    const { token } = useAuth();

    const select = (e) => {
        if (e.currentTarget.id) {
            selectProfile(foundProfiles.filter(profile =>
                profile.id === e.currentTarget.id)[0]);
            document.getElementById('profile-input').value = '';
            setSearchPrefixes(['', '']);
        }
        else
            console.error("The selected option does not match any of the available ones.")
    }

    const handleNameInput = async (e) => {
        const input = e.target.value.trim();
        let prefixes = ['', ''];
        const words = input.split(' ', 2);
        if (words.length > 0) {
            for (let i = 0; i < words.length; i++) {
                prefixes[i] = words[i];
            }
        }
        setSearchPrefixes(prefixes);
    }

    const handleClickInput = (e) => {
        const input = e.target.value.trim();
        if (input && foundProfiles.length > 0) {
            setDisplayDropdown(true);
        }
    }

    useEffect(() => {
        setIdsToHide(selectedProfiles.map(p => p.id));
    }, [selectedProfiles])

    useEffect(() => {
        if (foundProfiles.length > 0 && document.activeElement.id === 'profile-input') {
            setDisplayDropdown(true);
        } else {
            setDisplayDropdown(false)
        }
    }, [foundProfiles])

    useEffect(() => {
        async function fetchProfiles() {
            searchProfiles(token, searchPrefixes).then((profiles) => {
                const profilesToDisplay = profiles.filter(profile => !idsToHide.includes(profile.id))
                const noHiden = profilesToDisplay.filter(profile => !idsToHide.includes(profile.id));
                noHiden.length > 0 && setFoundProfiles(noHiden.map(p => new Profile(p)));
            }).catch(err => {
                console.error(`Fetching profiles error: ${err.message}`)
            })
        }
        if (searchPrefixes[0] !== '' || searchPrefixes[1] !== '')
            fetchProfiles();
        else
            setFoundProfiles([])
    }, [searchPrefixes, idsToHide, token])

    const onClickBg = (e) => {
        e.stopPropagation()
        setDisplayDropdown(false)
    }

    return (
        <>
            <div className="input-container">
                <input className="our-input" id="profile-input" type='text' onChange={handleNameInput} onClick={handleClickInput} placeholder='Imię i nazwisko...'></input>
                <i className="search-icon"><MdOutlinePersonSearch /></i>
            </div>
            {displayDropdown &&
                <label htmlFor="profile-input" className="dropdown">
                    <div className='dropdown-background' onClick={onClickBg}></div>
                    <div className="dropdown-options">
                        <ProfilesList profiles={foundProfiles} onItemClick={select} itemIcon={itemIcon}></ProfilesList>
                    </div >
                </label>
            }
        </>
    )
}

export default InputDropdown;
