import Conversation from "../domains/Conversation";
import Message from "../domains/Message";
import Profile from "../domains/Profile";

const apiHostUrl = 'http://localhost:8080';

export async function getUserConversations() {

    return await fetch(
        apiHostUrl + '/conversations',
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzcw=='
            }
        }
    ).then((response) => {
        return response.json();
    }).then((object) => {
        return object.body;
    }).then((body) => {
        let conversations = [];
        body.forEach((conversation) => {
            conversations.push(new Conversation(conversation))
        })
        return conversations;
    });
}

export async function getConversationMessages(conversationId, page = 0) {

    return await fetch(
        apiHostUrl + '/messages/conversation/' + conversationId + '?page=' + page,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzcw=='
            }
        }
    ).then((response) => {
        return response.json();
    }).then((object) => {
        return object.body;
    }).then((body) => {
        let messages = [];
        body.forEach((message) => {
            messages.push(new Message(message))
        })
        return messages;
    });
}

export async function postConversationMessage(conversationId, content) {

    return await fetch(
        apiHostUrl + '/messages/send/conversation/' + conversationId,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzcw=='
            },
            body: JSON.stringify({ content: content })
        }
    ).then((response) => {
        return response.json();
    }).then((object) => {
        return object.body;
    }).then((body) => {
        return new Message(body);
    });
}

export async function getProfile(profileId) {

    return await fetch(
        apiHostUrl + '/profiles/' + profileId,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzcw=='
            }
        }
    ).then((response) => {
        return response.json();
    }).then((object) => {
        return object.body;
    }).then((body) => {
        return new Profile(body);
    });
}