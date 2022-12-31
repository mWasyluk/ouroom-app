const ProfileItem = (props) => {
    const { profile, onClick } = props;

    return (
        <li key={profile.id} id={profile.id} className='profile-item' onClick={onClick}>
            <img className="profile-avatar" src={profile.avatar.imageUrl}></img>
            {profile.firstName + " " + profile.lastName}
        </li>
    )
}

export default ProfileItem;