import FormPopup from "./FormPopup";
import ProfileDetails from "../../models/ProfileDetails";
import ProfileService from '../../services/ProfileService';
import { appTitle } from "../../Root";

const ProfileForm = (props) => {
    const {
        setUser = () => { }
    } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;

        let profileDetails = new ProfileDetails({ firstName, lastName, birthDate });
        if (profileDetails.isValid()) {
            let profileResponse = await ProfileService.createProfile(profileDetails);
            if (profileResponse !== null) {
                setUser(profileResponse);
            }
        }
    }

    return (
        <FormPopup outsideBg={false} insideBg={{ opacity: 0.5 }} onSubmit={handleSubmit}>
            <span>Stwórz swój profil, aby w pełni korzystać z<strong>{appTitle}</strong></span>
            <div className="popup-group">
                <input type="text" name="first-name" id="first-name" placeholder="Imię..." />
                <input type="text" name="last-name" id="last-name" placeholder="Nazwisko..." />
                <input type="date" name="birth-date" id="birth-date" />
                <button type='submit' onClick={handleSubmit} id="submit">Zapisz profil</button>
            </div>
        </FormPopup>
    )
}

export default ProfileForm;