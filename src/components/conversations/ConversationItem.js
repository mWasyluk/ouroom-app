import { Component } from "react";
import './ConversationsList'

export default class ConversationItem extends Component {
    constructor(props) {
        super(props)
        this.conversation = props.conversation
        this.handleSelection = props.handleSelection
    }

    render() {
        return (
            <label id={this.conversation.id} className="conversation">
                <input type="radio" name="conversation" id={this.conversation.id}
                    onClick={this.handleSelection} />
                <img alt={this.conversation.name + "conversation image"} src={this.conversation.avatarUrl} width={40} height={40}></img>
                <span className="name">{this.conversation.name}</span>
            </label>
        )
    }
}