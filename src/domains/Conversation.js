import avatar from "../resources/wip-conversation.png"

export default class Conversation {
    constructor(conversation) {
        this.id = conversation.id;
        this.participators = conversation.participators;
        this.name = this.#getNameByParticipators(conversation.participators);
        this.avatarUrl = avatar;
        this.messages = conversation.messages;
    }

    #getNameByParticipators = function (participators = []) {
        let name = '';

        for (let i = 0; i < participators.length - 1; i++) {
            name += participators[i].firstName + ', ';
        }

        name += participators[participators.length - 1].firstName;
        return name;
    }
}