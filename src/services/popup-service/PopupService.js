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
    },
    topErrorDialog(content, onClick) {
        return (
            <div className="popup-layer" onClick={onClick}>
                <div className="popup-background"></div>
                <div className="popup-content top error">
                    {content}
                </div>
            </div>
        )
    },
    invokeErrorMessage(message) {
        invokeMessagePopupWithClass(message, 'top error')
    },
    invokeWarningMessage(message) {
        invokeMessagePopupWithClass(message, 'top warning')
    }
}

const invokeMessagePopupWithClass = (message, additionalClassValue) => {
    const popupLayer = document.createElement('div');
    popupLayer.className = 'popup-layer';
    const popupBackground = document.createElement('div');
    popupBackground.className = 'popup-background';
    const popupContent = document.createElement('div');
    popupContent.className = "popup-content " + additionalClassValue;

    const textContent = document.createElement('span');
    textContent.innerHTML = message;

    popupLayer.appendChild(popupBackground);
    popupLayer.appendChild(popupContent);
    popupContent.appendChild(textContent);

    const myRoot = document.body;

    myRoot.appendChild(popupLayer);
    popupLayer.onclick = () => { myRoot.removeChild(popupLayer) }
}

export default PopupService;