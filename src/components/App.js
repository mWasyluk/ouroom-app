import './App.css'
import { Component } from "react";
import Chat from './Chat';
import FriendsList from './FriendsList';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <FriendsList></FriendsList>
                <Chat></Chat>
            </div>
        )
    }
}