import { useEffect, useState } from "react";

import ProfileService from "../../services/ProfileService";
import ProfilesList from "../profiles/ProfilesList";

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
        const noHiden = foundProfiles.filter(profile => !idsToHide.includes(profile.id));
        setFoundProfiles(noHiden);
    }, [idsToHide])

    useEffect(() => {
        if (foundProfiles.length > 0 && document.activeElement.id === 'profile-input') {
            setDisplayDropdown(true);
        } else {
            setDisplayDropdown(false)
        }
    }, [foundProfiles])

    useEffect(() => {
        async function fetchProfiles() {
            const searchResult = await ProfileService.searchProfilesByNamesPrefixes(searchPrefixes);
            const profilesToDisplay = searchResult.filter(profile => !idsToHide.includes(profile.id))
            setFoundProfiles(profilesToDisplay);
        }
        if (searchPrefixes[0] !== '' || searchPrefixes[1] !== '')
            fetchProfiles();
        else
            setFoundProfiles([])
    }, [searchPrefixes])

    const onClickBg = (e) => {
        e.stopPropagation()
        setDisplayDropdown(false)
    }

    return (
        <>
            <input className="our-input" id="profile-input" type='text' onChange={handleNameInput} onClick={handleClickInput} placeholder='Imię i nazwisko...'></input>
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