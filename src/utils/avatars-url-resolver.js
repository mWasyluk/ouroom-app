import { apiUrl } from "./server-info";

export const baseAvatarsUrl = apiUrl + "/images/avatars"

export const getAvatarImageUrlById = (id) => {
    return baseAvatarsUrl + "/" + id;
}

export const getDefaultAvatarImageUrl = () => {
    return baseAvatarsUrl + "/default";
}