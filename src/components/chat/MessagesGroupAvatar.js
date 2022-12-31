import avatar from '../../resources/wip-avatar.jpg'

const MessagesGroupAvatar = (props) => {
    const style = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
    }
    return (
        <img alt='' src={avatar} style={style} className={props.className}></img>
    )
}

export default MessagesGroupAvatar;