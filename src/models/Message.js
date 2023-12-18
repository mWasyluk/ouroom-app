import { assert } from "utils/assertion-utils";

export default class Message {
    constructor(message) {
        assert(message.id && message.conversation?.id && message.content, "The Message model cannot be initialized without an ID, Conversation ID or content")

        this.id = message.id;
        this.conversation = { id: message.conversation.id };
        this.sender = message.sourceUserId;

        this.state = message.messageState;
        this.content = message.content;

        this.sentDate = message.sentDate ? new Date(message.sentDate) : null;
        this.deliveryDate = message.deliveryDate ? new Date(message.deliveryDate) : null;
        this.readDate = message.readDate ? new Date(message.readDate) : null;
    }
}
