import { Component } from "react";
import Friend from "./Friend";
import './FirendsList.css'
import { getFriends } from '../utils/fetch'

export default class FriendsList extends Component {
    state = {
        friends: [],
    }

    constructor(props) {
        super(props)

        this.state = ({
            friends: [],
            select: props.select,
            selectedFriend: null
        })

        this.getFriends()
    }

    getFriends = () => {
        getFriends().then((friends) => {
            this.setState({ friends: friends })
        })
    }

    handleSelection = (e) => {
        if (this.state.selectedFriend) {
            this.resetColor(this.state.selectedFriend.id)
        }
        this.setState(
            {
                selectedFriend: this.state.friends.filter(
                    friend => friend.id === e.target.id
                )[0]
            },
            () => {
                this.setColor(this.state.selectedFriend.id, 'yellow')
                this.state.select(this.state.selectedFriend)
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