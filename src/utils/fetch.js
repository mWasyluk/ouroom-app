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
        })

        return messages;
    }))
};
