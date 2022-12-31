import { useEffect, useState } from "react";

import ProfileItem from "./ProfileItem";
import ProfileService from "../../services/ProfileService";
import ProfilesList from "../conversations/ProfilesList";

const InputDropdown = (props) => {
    const { selectProfile } = props;
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [foundProfiles, setFoundProfiles] = useState([])
    const [searchPrefixes, setSearchPrefixes] = useState(['', '']);

    const select = (e) => {
        if (e.currentTarget.id)
            selectProfile(foundProfiles.filter(profile =>
                profile.id === e.currentTarget.id)[0]
            )
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
        if (input) {
            setDisplayDropdown(true);
        }
    }

    useEffect(() => {
        async function fetchProfiles() {
            const searchResult = await ProfileService.searchProfilesByNamesPrefixes(searchPrefixes);
            setFoundProfiles(searchResult);
            if (searchResult.length === 0) {
                setDisplayDropdown(false)
            }
        }
        fetchProfiles();
        if (foundProfiles.length > 0)
            setDisplayDropdown(true);
        else
            setDisplayDropdown(false)
    }, [searchPrefixes])

    const onClickBg = (e) => {
        e.stopPropagation()
        setDisplayDropdown(false)
    }

    return (
        <>
            <input type='text' onChange={handleNameInput} onClick={handleClickInput} placeholder='Imię i nazwisko...'></input>
            {displayDropdown &&
                <>
                    <div className='dropdown-background' onClick={onClickBg}></div>
                    <div className="dropdown-options">
                        <ProfilesList profiles={foundProfiles} onItemClick={select}></ProfilesList>
                    </div >
                </>
            }
        </>
    )
}

export default InputDropdown;