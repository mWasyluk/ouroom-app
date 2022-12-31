export default class Message {
    constructor(message) {
        this.id = message.id;
        this.conversationId = message.conversation.id;
        this.sender = message.sourceUserId;
        this.sentDate = message.sentDate;
        this.deliveryDate = message.deliveryDate;
        this.readDate = message.readDate;
        this.state = message.messageState;
        this.content = message.content;
    }
}