import { maxAvatarSize, maxAvatarSizeInKB, supportedAvatarExtensionsAsString, supportedAvatarTypes } from '../../utils/avatar-utils'

import DefaultAvatar from '../../assets/default-avatar.png'
import { FaPencilAlt } from 'react-icons/fa'
import ModalUtils from '../../utils/ModalUtils';
import { useState } from 'react'

const editFileIcon = <FaPencilAlt></FaPencilAlt>;
const reader = new FileReader();

const AvatarSelector = (props) => {
    const {
        selectFile = () => { }
    } = props
    const [src, setSrc] = useState(DefaultAvatar);

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (!supportedAvatarTypes.includes(file.type)) {
            ModalUtils.pushSimpleInfoTopModal(
                <span>format wybranego przez Ciebie pliku nie jest aktualnie wspierany. Obsługiwane formaty to: <strong style={{ color: 'firebrick' }}>{supportedAvatarExtensionsAsString}.</strong></span>
            );
            return;
        }

        if (file.size > maxAvatarSize) {
            ModalUtils.pushSimpleInfoTopModal(
                <span>wybrany przez Ciebie plik jest za duży. Wybierz obraz, który ma <strong style={{ color: 'firebrick' }}>rozmiar nie większy niż {maxAvatarSizeInKB} KB.</strong></span>
            );
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