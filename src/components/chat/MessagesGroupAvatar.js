const MessagesGroupAvatar = (props) => {
    const {
        url = ''
    } = props;

    const style = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
    }

    return (
        <img className='group-avatar' style={style} alt='' src={url} ></img>
    )
}

export default MessagesGroupAvatar;