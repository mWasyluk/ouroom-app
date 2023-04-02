const style = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
}

const MessagesGroupAvatar = ({ url }) => {
    const isLoading = url ? false : true;

    if (isLoading) {
        return (
            <div className='group-avatar our-loading-bg' style={style}></div>
        )
    }

    return (
        <img className='group-avatar' style={style} alt='' src={url} ></img>
    )
}

export default MessagesGroupAvatar;