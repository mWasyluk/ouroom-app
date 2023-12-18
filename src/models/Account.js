import Profile from "./Profile";
import { assert } from "utils/assertion-utils";

export default class Account {
    constructor({ id, profile }) {
        assert(id, 'The Account model cannot be initialized without an ID')

        this.id = id;
        this.profile = profile ? new Profile(profile) : null;
    }
}
