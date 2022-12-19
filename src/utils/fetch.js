import Conversation from "../domains/Conversation";
import Message from "../domains/Message";
import Profile from "../domains/Profile";
import Account from "../domains/Account";

const apiHostUrl = 'http://localhost:8080';

function headers(authToken) {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authToken
    }
}

export async function getUserConversations(token) {

    return await fetch(
        apiHostUrl + '/conversations',
        {
            method: 'GET',
            mode: 'cors',
            headers: headers(token)
        }
    ).then((response) => {
        return response.ok ? response.json() : {};
    }).then((object) => {
        if (object.body) {
            let conversations = [];
            object.body.forEach((conversation) => {
                conversations.push(new Conversation(conversation))
            })
            return conversations;
        }
        return {};
    });
}

export async function getConversationMessages(token, conversationId, page = 0) {

    return await fetch(
        apiHostUrl + '/messages/conversation/' + conversationId + '?page=' + page,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers(token)
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

export async function postConversationMessage(token, conversationId, content) {

    return await fetch(
        apiHostUrl + '/messages/send/conversation/' + conversationId,
        {
            method: 'POST',
            mode: 'cors',
            headers: headers(token),
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

export async function getUserAccountWithProfile(token) {
    return await fetch(
        apiHostUrl + '/accounts',
        {
            method: 'GET',
            mode: 'cors',
            headers: headers(token)
        }
    ).then((response) => {
        if (response.ok)
            return response.json();
        return {}
    }).then((object) => {
        if (object.body)
            return new Account(object.body);
        else return {}
    });
}

export async function getProfile(token, profileId) {

    return await fetch(
        apiHostUrl + '/profiles/' + profileId,
        {
            method: 'GET',
            mode: 'cors',
            headers: headers(token)
        }
    ).then((response) => {
        return response.json();
    }).then((object) => {
        return object.body;
    }).then((body) => {
        return new Profile(body);
    });
}