import { Component } from "react";
import Friend from "./Friend";
import { v4 } from 'uuid'
import './FirendsList.css'

export default class FriendsList extends Component {
    state = {
        friends: [],
    }

    constructor(props) {
        super(props)

        this.state = ({
            friends: [
                {
                    id: v4(),
                    name: "Jan Wonsz",
                    messages: [{ content: 'co tam' }, { content: 'elo' }]
                },
                {
                    id: v4(),
                    name: "Karol Boń",
                    messages: [{ content: 'Może jutro' }]
                },
                {
                    id: v4(),
                    name: "Aaa aaa",
                    messages: [{ content: 'Może jutro' }]
                }
            ],
            selectedId: ''
        })
    }
    handleSelection = (e) => {
        if (this.state.selectedId) {
            this.resetColor(this.state.selectedId)
        }
        this.setState(
            { selectedId: e.target.id },
            () => this.setColor(this.state.selectedId, 'yellow')
        );
        console.log(e.target.id)
    }

    resetColor = (id) => {
        this.setColor(id, 'white')
    }

    setColor = (id, color) => {
        let target = document.getElementById(id)
        target.style.backgroundColor = color
    }

    render() {
        const list = this.state.friends.map(friend =>
            <p key={friend.id}>
                <Friend id={friend.id}
                    name={friend.name}
                    messages={friend.messages}
                    handleSelection={this.handleSelection.bind(this)}
                />
            </p>
        )
        return (
            <div className="firends-list">
                {list}
            </div>
        )
    }

}