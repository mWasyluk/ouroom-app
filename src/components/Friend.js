import { Component } from "react";
import './ConversationsList.css'

export default class Conversation extends Component {
    constructor(props) {
        super(props)
        this.id = props.id;
        this.name = props.name;
        this.avatar = props.avatar;
        this.messages = props.messages;
        this.handleSelection = props.handleSelection
    }

    render() {
        return (
            <label id={this.id} className="friend">
                <input type="radio" name="friend" id={this.id}
                    onClick={this.handleSelection} />
                <img src={this.avatar} width={40} height={40}></img>
                <span className="username">{this.name}</span>
            </label>
        )
    }
}