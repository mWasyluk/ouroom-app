import { Component } from "react";
import './FirendsList.css'

export default class Friend extends Component {
    constructor(props) {
        super(props)
        this.id = props.id;
        this.name = props.name;
        this.messages = props.messages;
        this.handleSelection = props.handleSelection
    }

    render() {
        return (
            <label id={this.id} className="friend">
                <input type="radio" name="friend" id={this.id}
                    onClick={this.handleSelection} />
                {this.name}
            </label>
        )
    }
}