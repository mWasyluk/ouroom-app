export default function getUsernameById(id) {
    return fetch(
        'accounts.json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => {
        return response.json().then((data) => { return data });
    }).then((array) => {
        return array.filter(acc => acc.account.id == id)[0].account.name
    })
}