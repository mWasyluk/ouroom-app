import './App.css'
import { Component } from "react";
import Chat from './Chat';
import FriendsList from './FriendsList';
import { getMessagesWith } from '../utils/fetch'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { conversation: [], user: props.user, targetFriend: null }
    }

    async handleFriendSelection(friend) {
        let messagess = await getMessagesWith(this.state.user.id, friend.id);
        this.setState({ conversation: messagess, targetFriend: friend })
    }

    render() {
        return (
            <div className="App">
                <FriendsList select={this.handleFriendSelection.bind(this)}></FriendsList>
                <Chat user={this.state.user} target={this.state.targetFriend} messages={this.state.conversation}></Chat>
            </div>
        )
    }
}