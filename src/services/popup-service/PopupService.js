import './popup-style.css'

const PopupService = {
    centerPopup(content, onBgClick) {
        return (
            <div className="popup-layer">
                <div className="popup-background" onClick={onBgClick}></div>
                <div className="popup-content">
                    {content}
                </div>
            </div>
        )
    }
}

export default PopupService;