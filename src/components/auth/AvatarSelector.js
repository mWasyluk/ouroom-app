import { maxAvatarSize, maxAvatarSizeInKB, supportedAvatarExtensionsAsString, supportedAvatarTypes } from '../../utils/avatar-utils'

import DefaultAvatar from '../../assets/default-avatar.png'
import { FaPencilAlt } from 'react-icons/fa'
import PopupService from '../../services/popup-service/PopupService';
import { useState } from 'react'

const editFileIcon = <FaPencilAlt></FaPencilAlt>;
const reader = new FileReader();

const AvatarSelector = (props) => {
    const {
        selectFile = () => { }
    } = props
    const [src, setSrc] = useState(DefaultAvatar)

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (!supportedAvatarTypes.includes(file.type)) {
            PopupService.invokeErrorMessage('Format wybranego przez Ciebie pliku nie jest aktualnie wspierany. Obsługiwane formaty to: ' + supportedAvatarExtensionsAsString + '.')
            return;
        }

        if (file.size > maxAvatarSize) {
            PopupService.invokeErrorMessage('Wybrany przez Ciebie plik jest za duży. Wybierz obraz, który ma rozmiar nie większy niż ' + maxAvatarSizeInKB + 'KB.')
            return;
        }

        reader.readAsDataURL(file);
        reader.onload = e => {
            setSrc(e.target.result);
        }
        selectFile(file);
    }

    return (
        <div className="avatar-selector">
            <input type='file' className="avatar-input" onChange={handleInputChange} name="image" id='avatar-input' accept="image/jpeg, image/png"></input>

            <label htmlFor="avatar-input" id='avatar-label' className="avatar-image">
                <img alt='Avatar preview' src={src}></img>

                <i className="avatar-image-cover">
                    {editFileIcon}
                </i>
            </label>
        </div >
    )
}

export default AvatarSelector;