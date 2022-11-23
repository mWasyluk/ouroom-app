import './App.css'
import { Component } from "react";
import Chat from './Chat';
import FriendsList from './FriendsList';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { conversation: [] }
    }

    fetchFriendMessages = (friend) => {
        fetch(
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
            let messagesFrom = messages.messages.filter(message => message.author === friend.id)
            messagesFrom.map(message => message.author = friend.name)
            this.setState({ conversation: messagesFrom })
        });
    }

    render() {
        return (
            <div className="App">
                <FriendsList select={this.fetchFriendMessages.bind(this)}></FriendsList>
                <Chat messages={this.state.conversation}></Chat>
            </div>
        )
    }
}