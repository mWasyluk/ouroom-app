import Profile from "./Profile";

export default class Account {
    constructor(account) {
        this.profile = new Profile(account.profile);
    }
}