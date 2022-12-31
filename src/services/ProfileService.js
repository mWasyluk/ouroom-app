import AuthService from "./AuthService"
import Profile from "../models/Profile";
import { apiUrl } from "../utils/server-info";
import axios from "axios";

const ProfileService = {
    async createProfile({ firstName, lastName, birthDate, avatar } = {}) {
        const response = await requestCreateProfile({ firstName, lastName, birthDate, avatar });
        return response.status === 201 ?
            new Profile(response.data.body) : null;
    },

    async searchProfilesByNamesPrefixes(prefixes = []) {
        const response = await requestProfilesByNamesPrefixes(prefixes);
        return response.status === 200
            ? response.data.body.map((profile) => new Profile(profile))
            : null;
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

async function requestProfilesByNamesPrefixes(prefixes = []) {
    let prefixesQuery = '';
    prefixes.map(prefix => prefix + '%20')
        .forEach((prefix) => prefixesQuery += prefix);

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': AuthService.getAuthToken()
        }
    }
    return await axios.get(
        apiUrl + '/profiles/search?q=' + prefixesQuery,
        config).catch(err => {
            return { status: 400 }
        });
}

export default ProfileService;