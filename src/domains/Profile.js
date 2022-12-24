export default class Profile {
    constructor({ id, avatar, lastName, firstName } = {}) {
        this.id = id;
        this.avatar = avatar;
        this.lastName = lastName;
        this.firstName = firstName;
    }

    isComplete() {
        return (this.avatar && this.firstName && this.lastName) ? true : false;
    }
}