import { getAvatarImageUrlById, getDefaultAvatarImageUrl } from '../utils/avatars-url-resolver';

export default class Profile {
    constructor({ id, avatar, lastName, firstName } = {}) {
        this.id = id;
        if (avatar)
            this.avatar = { imageUrl: getAvatarImageUrlById(avatar.id) }
        else
            this.avatar = { imageUrl: getDefaultAvatarImageUrl() }
        this.lastName = lastName;
        this.firstName = firstName;
    }

    isComplete() {
        return (this.avatar && this.firstName && this.lastName) ? true : false;
    }
}