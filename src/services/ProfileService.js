import axios from "axios";
import Profile from "../domains/Profile";
import { apiUrl } from "../utils/api-dao";
import AuthService from "./AuthService"

const ProfileService = {
    async createProfile({ firstName, lastName, birthDate, avatar } = {}) {
        const response = await requestCreateProfile({ firstName, lastName, birthDate, avatar });
        console.log(response)
        return response.status === 201 ?
            new Profile(response.data.body) : null;
    }
}

async function requestCreateProfile(profile) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': AuthService.getAuthToken()
        }
    }
    return await axios.post(
        apiUrl + '/profiles/create', profile, config).catch(err => {
            return { status: 400 }
        });
}

export default ProfileService;