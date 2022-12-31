import Img from '../assets/wip-avatar.jpg'

export default class Profile {
    constructor({ id, avatar, lastName, firstName } = {}) {
        this.id = id;
        this.avatar = { imageUrl: Img };
        this.lastName = lastName;
        this.firstName = firstName;
    }

    isComplete() {
        return (this.avatar && this.firstName && this.lastName) ? true : false;
    }
}