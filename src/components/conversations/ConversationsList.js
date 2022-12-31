import '../../styles/ConversationsList.css'

import { Component } from "react";
import Conversation from "../../domains/Conversation";
import ConversationItem from "./ConversationItem";
import NewConversationButton from "./NewConversationButton";

export default class ConversationsList extends Component {
    constructor(props) {
        super(props)

        this.state = ({
            user: props.user,
            conversations: props.conversations,
            select: props.select,
            selectedConversation: null
        })
    }

    componentDidMount() {
        this.baseWidth = this.state.conversations[0]
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.conversations !== prevState.conversations ||
            nextProps.target !== prevState.target) {
            return ({ conversations: nextProps.conversations })
        }
        return null
    }

    handleSelection = (e) => {
        if (this.state.selectedConversation) {
            this.resetColor(this.state.selectedConversation.id)
        }
        let selected = new Conversation(this.state.conversations.filter(
            conversation => conversation.id === e.target.id
        )[0]);

        this.setState(
            {
                selectedConversation: selected
            },
            () => {
                this.setColor(this.state.selectedConversation.id, '#00ffcf')
                this.state.select(this.state.selectedConversation)
            }
        );
    }

    resetColor = (id) => {
        this.setColor(id, 'white')
    }

    setColor = (id, color) => {
        let target = document.getElementById(id)
        target.style.backgroundColor = color
    }

    render() {
        let list = []
        if (this.state.conversations.length)
            list = this.state.conversations.map(conversation =>
                <p key={conversation.id}>
                    <ConversationItem conversation={conversation}
                        handleSelection={this.handleSelection.bind(this)}
                    />
                </p>
            )
        return (
            <div className="conversations-list">
                <NewConversationButton userId={this.state.user.profile.id} />
                {list}
            </div>
        )
    }

}