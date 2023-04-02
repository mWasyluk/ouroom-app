import Message from "./Message";
import Profile from "./Profile";
import { assert } from "utils/assertion-utils";
import avatar from "../assets/wip-conversation.png";
import { generateUuid } from "utils/uuid-utils";

export default class Conversation {
    constructor({ id, participators, messages }) {
        assert(id && participators.length, "The Conversation model cannot be initialized without an ID or participants array")

        this.id = id;
        this.participators = participators.map(part => new Profile(part));
        this.name = this.#getNameByParticipators(participators);
        this.avatarUrl = avatar;
        this.messages = messages?.map(m => m instanceof Message ? m : new Message(m)) || [];
    }

    #getNameByParticipators = function (participators = []) {
        function isLastOne(p) {
            return participators.indexOf(p) === participators.length - 1;
        }
        const name = participators.map(p => `${p.firstName}${isLastOne(p) ? '' : ', '}`)

        return name;
    }

    get messagesGroups() {
        if (!this.messages.length) {
            return [];
        }

        const result = this.messages.reduce((resultArray, message) => {
            const lastGroup = resultArray && (resultArray[resultArray.length ? resultArray.length - 1 : 0]);
            const currentMessageSender = this.participators.filter(p => p.id === message.sender)[0];
            assert(currentMessageSender, 'Message group cannot be instantiated without a proper sender object');

            if (!lastGroup || lastGroup.sender.id !== currentMessageSender.id) {
                resultArray.push({ id: generateUuid(), sender: currentMessageSender, messages: [message] });
            } else {
                lastGroup.messages.unshift(message);
            }

            return resultArray;
        }, [])

        return result;
    }
}