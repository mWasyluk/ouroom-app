import { getAvatarImageUrlById, getDefaultAvatarImageUrl } from '../utils/avatar-utils';

import { assert } from 'utils/assertion-utils';

export default class Profile {
    constructor({ id, avatar, lastName, firstName }) {
        assert(id && lastName && firstName, "The Profile model cannot be initialized without an ID, first name or last name")

        this.id = id;
        this.avatar = avatar?.id
            ? { id: avatar.id, imageUrl: getAvatarImageUrlById(avatar.id) }
            : { imageUrl: getDefaultAvatarImageUrl() }
        this.lastName = lastName;
        this.firstName = firstName;
    }

    isComplete() {
        return (this.avatar && this.firstName && this.lastName) ? true : false;
    }
}