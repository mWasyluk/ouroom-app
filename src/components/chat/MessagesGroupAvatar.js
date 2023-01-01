const MessagesGroupAvatar = (props) => {
    const style = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
    }
    return (
        <img alt='' src={props.url} style={style} className={props.className}></img>
    )
}

export default MessagesGroupAvatar;