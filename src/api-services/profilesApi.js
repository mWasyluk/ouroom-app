import axios from 'axios';

const baseURL = '/api/profiles';

export const createProfile = async (token, { firstName, lastName, birthDate, avatarFile }) => {
    const formData = new FormData();
    formData.append('profile', JSON.stringify({ firstName, lastName, birthDate }));
    formData.append('avatar', avatarFile);

    return await axios({
        baseURL: baseURL,
        url: '/create',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
            'Accept': 'application/json',
            'Authorization': token,
        },
        data: formData
    }).then(res => { return res.data.body });
}

export const searchProfiles = async (token, prefixes = []) => {
    return await axios({
        baseURL: baseURL,
        url: '/search',
        method: 'get',
        params: {
            q: `${prefixes[0]} ${prefixes[1]}`
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        },
    }).then(res => { return res.data.body });
}
