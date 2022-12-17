export default class Profile {
    constructor(profile) {
        this.id = profile.id;
        this.avatarUrl = profile.avatar.imageUrl;
        this.lastName = profile.lastName;
        this.firstName = profile.firstName;
    }
}