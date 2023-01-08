import ProfileItem from "./ProfileItem";

const ProfilesList = (props) => {
    const {
        profiles = [],
        onItemClick = () => { },
        itemIcon = <></>
    } = props;

    return (
        <ul className="profile-list our-selectable-box-shadow">
            {profiles.map(profile => <ProfileItem key={profile.id} profile={profile} onClick={onItemClick} icon={itemIcon}></ProfileItem>)}
        </ul>
    )
}

export default ProfilesList;