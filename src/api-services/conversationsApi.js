import Conversation from 'models/Conversation';
import { assert } from 'utils/assertion-utils';
import axios from 'axios';
import { getConversationMessages } from 'api-services/messagesApi';

const baseURL = '/api/conversations';

export const createConversation = async (token, participators = []) => {
    return await axios({
        baseURL: baseURL,
        url: '/create',
        method: 'post',
        data: { participators: [...participators] },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        }
    }).then(res => res.data.body);
}

export const getActiveConversations = async (token) => {
    return await axios({
        baseURL: baseURL,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        }
    }).then(res => res.data.body);
}

export const getConversationById = async (token, { id }) => {
    return await axios({
        baseURL: baseURL,
        url: `/${id}`,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        }
    }).then(res => res.data.body);
}

export const getConversationWithMessagesById = async (token, { id }) => {
    let error = undefined;
    const fetchedConversation = await getConversationById(token, { id }).catch((err) => error = err);
    const fetchedMessages = await getConversationMessages(token, id, 0).catch((err) => error = err);

    assert(!error, `Conversation fetching error: ${error?.message}`);

    const result = new Conversation({ ...fetchedConversation, messages: fetchedMessages });
    return result;
}
