import Profile from "./Profile";
import avatar from "../assets/wip-conversation.png"

export default class Conversation {
    constructor(conversation) {
        this.id = conversation.id;
        this.participators = conversation.participators.map(part => new Profile(part));
        this.name = this.#getNameByParticipators(conversation.participators);
        this.avatarUrl = avatar;
        conversation.messages ?
            this.messages = conversation.messages :
            this.messages = [];
    }

    #getNameByParticipators = function (participators = []) {
        let name = '';

        for (let i = 0; i < participators.length - 1; i++) {
            name += participators[i].firstName + ', ';
        }

        name += participators[participators.length - 1].firstName;
        return name;
    }

    get messagesGroups() {
        let groups = []
        if (this.participators.length && this.messages.length) {
            let sender = {}
            let groupMessages = []
            for (const m of this.messages) {
                const lastSender = sender;
                sender = this.participators.filter(p => p.id === m.sender)[0];
                if (groupMessages.length && lastSender !== sender) {
                    groups.push({ sender: lastSender, messages: groupMessages })
                    groupMessages = [];
                }
                groupMessages.unshift(m);
            }
            groups.push({ sender: sender, messages: groupMessages })
        }
        return groups;
    }
}