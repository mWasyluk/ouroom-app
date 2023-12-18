import './style.css'

const ProfileItem = (props) => {
    const {
        profile = {},
        onClick = () => { },
        icon = { iconElement: <></>, color: '#fff' }
    } = props;

    return (
        <li key={profile.id} id={profile.id} className='profile-item' onClick={onClick}>
            <div className="profile-details">
                <img alt='Profile avatar' className="profile-avatar" src={profile.avatar.imageUrl}></img>
                {profile.firstName + " " + profile.lastName}
            </div>
            <i className="item-icon" style={{ color: icon.color }}>{icon.iconElement}</i>
        </li>
    )
}

export default ProfileItem;
