import Profile from "./Profile";

export default class Account {
    constructor({ id = '', profile = {} } = {}) {
        if (id) {
            this.id = id;
        }
        if (profile)
            this.profile = new Profile(profile);
        else
            this.profile = new Profile({})
    }
}