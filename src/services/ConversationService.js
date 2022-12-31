import AuthService from "./AuthService";
import Conversation from "../domains/Conversation";
import Message from "../domains/Message";
import { apiUrl } from "../utils/server-info";
import axios from "axios";

const ConversationService = {
    async createConversation(conversationParticipators = []) {
        const requestBody = { participators: conversationParticipators }
        console.log('Sending request', requestBody)
        let response = await requestCreation(requestBody);
        return response.status === 201 ?
            new Conversation(response.data.body) : null;
    },

    async getUserConversations() {
        const response = await requestGetConversations();
        if (response.status === 200) {
            const conversations = response.data.body;
            return conversations.map(conversation => new Conversation(conversation));
        }
        return null;
    },

    async sendConversationMessage(conversationId, messageContent) {
        const response = await requestSendConversationMessage(conversationId, { content: messageContent });
        if (response.status === 201) {
            return new Message(response.data.body);
        } else {
            return null;
        }
    },

    async getConversationMessages(conversationId, page = 0) {
        const response = await requestGetConversationMessages(conversationId, page);
        if (response.status === 200) {
            const messages = response.data.body;
            return messages.map(message => new Message(message));
        } else {
            return null;
        }
    }
}

const config = {
    headers: {
        'Accept': 'application/json',
        'Authorization': AuthService.getAuthToken(),
    }
}

async function requestCreation(participators = {}) {
    return await axios.post(
        apiUrl + '/conversations/create',
        participators,
        config
    ).catch(err => {
        return { status: 400 }
    });
}

async function requestGetConversations() {
    const response = await axios.get(
        apiUrl + '/conversations',
        config
    ).catch(err => {
        return { response: { status: 400 } }
    });
    return response;
}

async function requestSendConversationMessage(conversationId, message = {}) {
    let response = await axios.post(
        apiUrl + '/messages/send/conversation/' + conversationId,
        message,
        config
    ).catch(err => {
        return { response: { status: 400, error: err } }
    })
    return response;
}

async function requestGetConversationMessages(conversationId, page = 0) {
    let response = await axios.get(
        apiUrl + '/messages/conversation/' + conversationId + '?page=' + page,
        config
    ).catch(err => {
        return { response: { status: 400, error: err } }
    })
    return response;
}

export default ConversationService;