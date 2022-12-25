import axios from "axios";
import Conversation from "../domains/Conversation";
import { apiUrl } from "../utils/api-dao";
import AuthService from "./AuthService";

const ConversationService = {
    async createConversation(conversationParticipators = []) {
        const requestBody = { participators: conversationParticipators }
        console.log('Sending request', requestBody)
        let response = await requestCreation(requestBody);
        return response.status === 201 ?
            new Conversation(response.data.body) : null;
    }
}

async function requestCreation(participators = {}) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': AuthService.getAuthToken(),
        }
    }
    return await axios.post(
        apiUrl + '/conversations/create', participators, config).catch(err => {
            return { status: 400 }
        });
}

export default ConversationService;