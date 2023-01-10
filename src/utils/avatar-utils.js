export const baseAvatarsUrl = "/images/avatars"
export const supportedAvatarTypes = ['image/jpeg', 'image/png']
export const supportedAvatarExtensionsAsString = '.png, .jpg, .jpeg, .jpe .jif, .jfif, .jfi'
export const maxAvatarSizeInKB = 300;
export const maxAvatarSize = maxAvatarSizeInKB * 1024;
export const avatarParamName = 'image';

export const getAvatarImageUrlById = (id) => {
    return baseAvatarsUrl + "/" + id;
}

export const getDefaultAvatarImageUrl = () => {
    return baseAvatarsUrl + "/default";
}