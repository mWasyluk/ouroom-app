import ProfileItem from "../popups/ProfileItem";

const ProfilesList = (props) => {
    const {
        profiles = [],
        onItemClick = () => { }
    } = props;

    return (
        <ul className="profile-list">
            {profiles.map(profile => <ProfileItem key={profile.id} profile={profile} onClick={onItemClick}></ProfileItem>)}
        </ul>
    )
}

export default ProfilesList;