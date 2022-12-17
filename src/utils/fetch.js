import Conversation from "../domains/Conversation";
import Message from "../domains/Message";
import Profile from "../domains/Profile";

const apiHostUrl = 'http://localhost:8080';

export async function getUsernameById(id) {
    return await fetch(
        'accounts.json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => {
        return response.json();
    }).then((accounts) => {
        let username = accounts.filter(account => account.id === id)[0].name
        return username;
    })
}

export async function getFriends() {
    return fetch(
        'friends.json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => {
        return response.json();
    }).then((object) => {
        return object.friends;
    });
}

export async function getMessagesWith(userId, withId) {
    let userUsername = await getUsernameById(userId);
    let withUsername = await getUsernameById(withId);

    return await fetch(
        'messages.json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => {
        return response.json();
    }).then((messages) => {
        let messagesFrom = messages.messages.filter(message =>
            message.author === withId || (
                message.target === withId &&
                message.author === userId)
        )
        return messagesFrom
    }).then((messages => {
        messages.map((message) => {
            if (message.author === userId)
                message.author = userUsername;
            else
                message.author = withUsername;
            return message;
        })

        return messages;
    }))
};

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

export async function getConversationMessages(conversationId) {

    return await fetch(
        apiHostUrl + '/messages/conversation/' + conversationId,
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