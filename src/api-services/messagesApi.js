import { assert } from 'utils/assertion-utils';
import axios from 'axios';

const baseURL = '/api/messages';
export const conversationMessagesPageSize = 30;

export const getConversationMessages = async (token, id, page = 0) => {
    return await axios({
        baseURL: baseURL,
        url: `/conversation/${id}`,
        method: 'get',
        params: {
            page: page
        },
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        }
    }).then(res => res.data.body);
}

export const sendConversationMessage = async (token, id, { content }) => {
    assert(content, 'Sending an empty message is prohibited.')

    return await axios({
        baseURL: baseURL,
        url: `/send/conversation/${id}`,
        method: 'post',
        data: { content },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        }
    }).then(res => res.data.body);
}