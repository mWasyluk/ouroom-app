import axios from 'axios';
import { toBcrypt } from 'utils/bcrypt-utils';

const baseURL = '/api/accounts';

export const getActiveAccount = async (token) => {
    return await axios({
        baseURL: baseURL,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        }
    }).then(res => res.data.body);
}

export const registerAccount = async ({ email, password }) => {
    const encodedPassword = toBcrypt(password);

    return await axios({
        baseURL: baseURL,
        url: '/register',
        method: 'post',
        data: {
            email,
            password: encodedPassword,
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }).then(res => res.data.body);
}