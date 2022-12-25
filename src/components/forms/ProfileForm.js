import '../../styles/form-styles.css'
import ProfileDetails from "../../domains/ProfileDetails";
import { appTitle } from "../../Root";
import ProfileService from '../../services/ProfileService';

const ProfileForm = (props) => {
    const handleSubmit = async () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;

        let profileDetails = new ProfileDetails({ firstName, lastName, birthDate });
        if (profileDetails.isValid()) {
            let profileResponse = await ProfileService.createProfile(profileDetails);
            if (profileResponse !== null) {
                props.setUser(profileResponse);
            }
        }
    }

    return (
        <div className="popup-form">
            <span>Stwórz swój profil, aby w pełni korzystać z<strong>{appTitle}</strong></span>
            <input type="text" name="first-name" id="first-name" placeholder="Imię..." />
            <input type="text" name="last-name" id="last-name" placeholder="Nazwisko..." />
            <input type="date" name="birth-date" id="birth-date" />
            <button type='submit' onClick={handleSubmit} id="submit">Zapisz profil</button>
        </div >
    )
}

export default ProfileForm;