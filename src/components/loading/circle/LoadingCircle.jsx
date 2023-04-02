function LoadingCircle({ s }) {
    const size = s ? `${s}px` : '40px';

    return (
        <div className='our-loading-border' style={{ width: size, height: size }}></div>
    )
}

export default LoadingCircle;